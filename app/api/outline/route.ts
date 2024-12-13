// app/api/outline/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { writeFile } from 'fs/promises';
import { join } from 'path';

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
    systemInstruction: "you are an AI presentation outline generator based on provided presentation description and images and any other files create a detailed outline about the content, theme, structure, colors, fonts, positioning, images to be used and everything to create an highly professional and AESTHETIC presentation. this is for input to an LLM to generate presentation programmatically based on the outline that you provide it will use pptxgenjs library to create presentation. so make sure you are as detailed about each content, design, positioning, theme, colors, fonts and everything so that it can easily convert your outline into code to genrete the ppt"
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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const prompt = formData.get('prompt') as string;
    const files = formData.getAll('files') as File[];
    
    const uploadedFiles = await Promise.all(
      files.map(async file => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return uploadToGemini(buffer, file.type, file.name);
      })
    );

    await waitForFilesActive(uploadedFiles);
    const outline = await generateOutline(uploadedFiles, prompt);

    return NextResponse.json({ outline });

  } catch (error) {
    console.error('Error generating outline:', error);
    return NextResponse.json(
      { error: 'Failed to generate outline' },
      { status: 500 }
    );
  }
}