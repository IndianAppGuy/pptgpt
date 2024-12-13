import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import pptxgen from 'pptxgenjs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { PDFDocument } from 'pdf-lib';

const apiKey = 'AIzaSyCp57XksGugjftN2tVFo3IBZDQWLnjaIqg';
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

async function uploadToGemini(buffer: Buffer, mimeType: string, filename: string) {
  const tempPath = join('/tmp', filename);
  await writeFile(tempPath, buffer);
  
  const uploadResult = await fileManager.uploadFile(tempPath, {
    mimeType,
    displayName: filename,
  });
  
  return uploadResult.file;
}

async function waitForFilesActive(files: any[]) {
  for (const name of files.map(file => file.name)) {
    let file = await fileManager.getFile(name);
    while (file.state === "PROCESSING") {
      await new Promise(resolve => setTimeout(resolve, 5000));
      file = await fileManager.getFile(name);
    }
    if (file.state !== "ACTIVE") {
      throw Error(`File ${file.name} failed to process`);
    }
  }
}

async function generateOutline(files: any[], prompt: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "Create a detailed presentation outline based on the provided files and description."
  });

  const chatSession = model.startChat({
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    },
    history: [
      {
        role: "user",
        parts: [
          ...files.map(file => ({
            fileData: {
              mimeType: file.mimeType,
              fileUri: file.uri,
            },
          })),
          { text: prompt }
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("Generate a detailed presentation outline.");
  return result.response.text();
}

async function generatePPTCode(outline: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "You are a pptxgenjs expert. Convert the provided outline to presentation code using pptxgenjs."
  });

  const chatSession = model.startChat({
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    },
  });

  const result = await chatSession.sendMessage(outline);
  return result.response.text();
}

async function convertToPDF(pptx: any) {
  const pptxBuffer = await pptx.write('base64');
  const pdfDoc = await PDFDocument.create();
  return await pdfDoc.save();
}

export async function POST(req: NextRequest) {
    try {
      const formData = await req.formData();
      const prompt = formData.get('prompt') as string;
      const files = formData.getAll('files') as File[];
      
      // Upload files first
      const uploadedFiles = await Promise.all(
        files.map(async file => {
          const buffer = Buffer.from(await file.arrayBuffer());
          return uploadToGemini(buffer, file.type, file.name);
        })
      );
  
      await waitForFilesActive(uploadedFiles);
  
      // Generate outline first
      const outline = await generateOutline(uploadedFiles, prompt);
  
      // Send outline immediately
      const response = new Response(
        JSON.stringify({ outline })
      );
  
      // Start generating PDF in the background
      const pptCode = await generatePPTCode(outline);
      const pptx = new pptxgen();
      eval(pptCode);
      const pdfBuffer = await convertToPDF(pptx);
  
      // Send PDF when ready
      return new Response(
        JSON.stringify({ 
          pdf: pdfBuffer.toString('base64')
        })
      );
  
    } catch (error) {
      console.error('Error generating presentation:', error);
      return NextResponse.json(
        { error: 'Failed to generate presentation' },
        { status: 500 }
      );
    }
  }