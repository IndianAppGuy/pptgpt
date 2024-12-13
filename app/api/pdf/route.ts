// app/api/pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import pptxgen from 'pptxgenjs';
import { PDFDocument } from 'pdf-lib';

const apiKey = 'AIzaSyCp57XksGugjftN2tVFo3IBZDQWLnjaIqg';
const genAI = new GoogleGenerativeAI(apiKey);

async function generatePPTCode(outline: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "You are a pptxgenjs expert. Convert the provided outline to presentation code using pptxgenjs. dont give any description or anything just give the complete code to generate all the slides dont use any images for now"
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
  const responseText = await result.response.text();
  
  // Extract the text between ``` ```
  const extractedText = responseText.match(/```(?:\w+)?\s([\s\S]*?)```/)?.[1]?.trim() || 'No content found between triple backticks';
  return extractedText;
}

async function convertToPDF(pptx: any) {
  const pptxBuffer = await pptx.write('base64');
  const pdfDoc = await PDFDocument.create();
  return await pdfDoc.save();
}

export async function POST(req: NextRequest) {
  try {
    const { outline } = await req.json();
    
    const pptCode = await generatePPTCode(outline);
    const pptx = new pptxgen();
    console.log(pptCode);
    eval(pptCode);
    const pdfBuffer = await convertToPDF(pptx);

    return NextResponse.json({ 
      pdf: pdfBuffer.toString('base64') 
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}