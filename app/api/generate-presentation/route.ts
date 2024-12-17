// Backend: app/api/generate-presentation/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { readFile, unlink } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { createClient } from '@supabase/supabase-js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-require-imports
const PptxGenJS = require("pptxgenjs");

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const maxDuration = 900;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const prompt = formData.get('prompt') as string;
    
    const anthropic = new Anthropic({
      apiKey: process.env["ANTHROPIC_API_KEY"],
    });
    
    const pptId = randomUUID();
    const fileName = `${pptId}.pptx`;
    const filePath = path.join(process.cwd(), 'tmp', fileName);
    
    // Generate presentation using Claude
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
              "text": `create pptxgenjs code to generate a presentation based on the following information: ${prompt}. save the ppt as ${filePath}. use valid public image urls from unsplash use premium fonts, fontsizes, images and make the presentation extremely extremely premium and professional. most importantly make sure that all the elements are bounded inside the slide layout and are not positioned anywhere else apart from the slide layout. give code only and no explanation or any description
               writeFile(filename) is deprecated - please use WriteFileProps. dont use plain white background all times, use some thematic backgrounds make it as premium as possible. use alternate left image right text and right image left text. make sure you use large and premium fonts`
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

    const resp = (msg.content[0] as Anthropic.TextBlock).text;
    const code = `const PptxGenJS = require("pptxgenjs");
    const pptx = new PptxGenJS();
    ${resp}`;
    

    // Execute the code to generate PPTX
    await eval(code);
    
    
    // Read the generated file
    const fileBuffer = await readFile(filePath);
    
    // Upload to Supabase Storage
    const { error: uploadError } = await supabase
      .storage
      .from('presentation')
      .upload(`public/${fileName}`, fileBuffer, {
        contentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        upsert: true
      });

    if (uploadError) {
      throw new Error(`Failed to upload to Supabase: ${uploadError.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('presentation')
      .getPublicUrl(`public/${fileName}`);

    // Clean up temporary file
    await unlink(filePath);

    console.log(publicUrl);

  // Return the response with the correct headers
  /*
  return new NextResponse(
    JSON.stringify({
      success: true,
      message: 'Presentation generated successfully',
      url: publicUrl
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  */
  return NextResponse.json({ url: publicUrl });


  
  
} catch (error) {
  console.error('Error:', error);
  return new NextResponse(
    JSON.stringify({
      success: false,
      message: 'Failed to generate presentation',
      error: error instanceof Error ? error.message : 'Unknown error'
    }),
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
}

