// Backend: app/api/generate-presentation/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { readFile, unlink } from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { randomUUID } from 'crypto';


const execPromise = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const prompt = formData.get('prompt') as string;

    const anthropic = new Anthropic({
        apiKey: process.env["ANTHROPIC_API_KEY"],
      });

      const pptId = randomUUID();

      
      // Replace placeholders like {{presentation}} with real values,
      // because the SDK does not support variables.
      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 8192,
        temperature: 0,
        messages: [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": `create pptxgenjs code to generate a presentation based on the following information: ${prompt}. save the pp as ${pptId}.pptx. use valid public image urls from unsplash use premium fonts, fontsizes, images and make the presentation extremely extremely premium and professional. most importantly make sure that all the elements are bounded inside the slide layout and are not positioned anywhere else apart from the slide layout. give code only and no explanation or any description`
              }
            ]
          },
          {
            "role": "assistant",
            "content": [
              {
                "type": "text",
                "text": "const pptx = new PptxGenJS();"
              }
            ]
          }
        ]
      });
      console.log((msg.content[0] as Anthropic.TextBlock).text);
      const resp = (msg.content[0] as Anthropic.TextBlock).text;
      const code = 'const PptxGenJS = require("pptxgenjs"); const pptx = new PptxGenJS();' + resp;
      eval(code);


    // Convert to PDF using libreoffice
    const pdfPath = path.join(tempDir, 'presentation.pdf');
    await execPromise(`soffice --headless --convert-to pdf ${pptxPath} --outdir ${tempDir}`);

    // Read the PDF
    const pdfBuffer = await readFile(pdfPath);
    
    // Clean up temporary files
    await unlink(pptxPath);
    await unlink(pdfPath);
    

    // Return PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename=presentation.pdf'
      }
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Failed to generate presentation' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};