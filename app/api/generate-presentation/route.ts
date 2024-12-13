import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { readFile, unlink } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';
import { randomUUID } from 'crypto';
import * as libre from 'libreoffice-convert';
import { promisify } from 'util';

const libreConvert = promisify(libre.convert);

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const prompt = formData.get('prompt') as string;
        
        const anthropic = new Anthropic({
            apiKey: process.env["ANTHROPIC_API_KEY"],
        });

        // Generate random ID for files
        const pptId = randomUUID();
        
        // Create temporary directory if it doesn't exist
        const tempDir = path.join(process.cwd(), 'temp');
        await mkdir(tempDir, { recursive: true });
        
        // Define file paths with random ID
        const pptxPath = path.join(tempDir, `${pptId}.pptx`);
        const pdfPath = path.join(tempDir, `${pptId}.pdf`);

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
                            "text": `create pptxgenjs code to generate a presentation based on the following information: ${prompt}. save the ppt as pptx.writeFile({ fileName: "${pptxPath}" });. use valid public image urls from unsplash use premium fonts, fontsizes, images and make the presentation extremely extremely premium and professional. most importantly make sure that all the elements are bounded inside the slide layout and are not positioned anywhere else apart from the slide layout. give code only and no explanation or any description`
                        }
                    ]
                }
            ]
        });

        const resp = (msg.content[0] as Anthropic.TextBlock).text;
        
        // Modify the code to use the random filename
        const code = `
            const PptxGenJS = require("pptxgenjs");
            const pptx = new PptxGenJS();
            ${resp}
        `;

        await eval(code);

        // Read the generated PPTX file
        const pptxBuffer = await readFile(pptxPath);

        // Convert to PDF
        const pdfBuffer = await libreConvert(pptxBuffer, '.pdf', undefined);

        // Clean up the temporary PPTX file
        await unlink(pptxPath);

        // Return the PDF
        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `inline; filename=${pptId}.pdf`
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