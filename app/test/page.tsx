"use client"

import React, { useState, useRef } from 'react';
//import PptxGenJS from 'pptxgenjs';


const PresentationEditor = () => {
  const [code, setCode] = useState(`async function createPresentation(inputJSON) {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';

  // First Page
  let slide = pptx.addSlide('MASTER_SLIDE');
  slide.background = {
    path: "https://djgurnpwsdoqjscwqbsj.supabase.co/storage/v1/object/public/presentation-templates-data/section16_slide1_bckgrnd.png"
  };

  slide.addText(
    inputJSON.presentationTitle,
    {
      x: '5%',
      y: '33%',
      h: 1,
      w: "55%",
      fontSize: 30,
      bold: true,
      valign: "top",
      align: "left",
      fontFace: "Plus Jakarta Sans",
      color: "#FFFFFF"
    }
  );

  slide.addText(
    inputJSON.presentationSubtitle,
    {
      x: '5%',
      y: '60%',
      h: 0.8,
      w: "55%",
      fontSize: 13,
      valign: "top",
      align: "left",
      fontFace: "Plus Jakarta Sans",
      color: "#FFFFFF"
    }
  );

  slide.addImage({
    path: inputJSON.imageSearch,
    x: "63%",
    y: "5%",
    h: "90%",
    w: "34%"
  });

  if (inputJSON.imageSearch) {
    slide.addText(
      [{ text: "Photo by Pexels", options: { hyperlink: { url: "https://pexels.com/?utm_source=magicslides.app&utm_medium=presentation", tooltip: "Pexel" }}}],
      { x: "68%", y: "65%", w: 2, h: 0.5, fontSize: 8, color: "#FFFFFF" }
    );
  }

  // Table of Contents
  let tocSlide = pptx.addSlide();
  tocSlide.background = { path: "https://djgurnpwsdoqjscwqbsj.supabase.co/storage/v1/object/public/presentation-templates-data/section16_slide2_bckgrnd.jpg" };
  tocSlide.addText("Table of content", { x: "3%", y: "7%", h: 0.5, fontSize: 30, color: '#000000', w: "90%", bold: true, fontFace: "Plus Jakarta Sans", valign: "bottom", lineSpacing: 35 });

  const positions = [
    { x: '3%', y: '21%' }, { x: '50%', y: '21%' },
    { x: "3%", y: '35%' }, { x: '50%', y: '35%' },
    { x: "3%", y: '49%' }, { x: '50%', y: '49%' },
    { x: "3%", y: '63%' }, { x: '50%', y: '63%' }
  ];

  inputJSON.slides.forEach((slideData, index) => {
    const positionIndex = index % 8;
    const position = positions[positionIndex];
    const slideNumber = (index + 1).toString().padStart(2, '0');

    tocSlide.addImage({
      path: "https://djgurnpwsdoqjscwqbsj.supabase.co/storage/v1/object/public/presentation-templates-data/section16_tableOfCont_box.png",
      x: \`\${parseFloat(position.x) - 1}%\`,
      y: \`\${parseFloat(position.y) - 1}%\`,
      w: '46%',
      h: "10%",
    });

    tocSlide.addImage({
      path: "https://djgurnpwsdoqjscwqbsj.supabase.co/storage/v1/object/public/presentation-templates-data/section16_no_box.png",
      x: position.x,
      y: position.y,
      w: '4.5%',
      h: "8%",
    });

    tocSlide.addText(slideNumber, 
      { x: \`\${parseFloat(position.x)}%\`, y: \`\${parseFloat(position.y) + 1}%\`, h: "7%", fontSize: 13, color: '#ffffff', w: "4.5%", fontFace: "Plus Jakarta Sans", bold: true, valign: "center", align: "center" }
    );

    tocSlide.addText(slideData.title,
      { x: \`\${parseFloat(position.x) + 5}%\`, y: \`\${parseFloat(position.y)}%\`, h: "8%", fontSize: 13, color: '#000000', w: "33%", fontFace: "Plus Jakarta Sans", bold: true, valign: "center", align: "left" }
    );

    tocSlide.addImage({
      path: "https://djgurnpwsdoqjscwqbsj.supabase.co/storage/v1/object/public/presentation-templates-data/section16_Button%20Arrow.png",
      x: \`\${parseFloat(position.x) + 41.5}%\`,
      y: \`\${parseFloat(position.y) + 1.5}%\`,
      h: "5%", w: "3%"
    });
  });

  // Content Slides
  const slidePositions = [
    { y: "26%" }, { y: "41%" },
    { y: "56%" }, { y: "71%" }
  ];

  inputJSON.slides.forEach((slideData) => {
    let contentSlide = pptx.addSlide('MASTER_SLIDE');
    contentSlide.background = {
      path: "https://djgurnpwsdoqjscwqbsj.supabase.co/storage/v1/object/public/presentation-templates-data/section16_slide3_bckgrnd.jpg"
    };

    contentSlide.addText(slideData.title, {
      x: "5%", y: "5%", h: 1, fontSize: 30, color: '#000000', w: "65%",
      fontFace: "Plus Jakarta Sans", align: "left", bold: true
    });

    slideData.sections.forEach((section, index) => {
      if (index < 4) {
        contentSlide.addImage({
          path: "https://djgurnpwsdoqjscwqbsj.supabase.co/storage/v1/object/public/presentation-templates-data/section16_slide3_box.png",
          x: "5%",
          y: \`\${parseFloat(slidePositions[index].y) - 3}%\`,
          h: "12%",
          w: "60%"
        });

        contentSlide.addText(section, {
          x: "7%", y: \`\${parseFloat(slidePositions[index].y) - 6}%\`, h: 1,
          fontSize: 10, color: '#000000', w: "55%",
          fontFace: "Plus Jakarta Sans", align: "left"
        });
      }
    });

    contentSlide.addImage({
      path: slideData.imageSearch,
      h: "60%", w: "25%",
      x: "72%", y: "25%",
      align: "center",
    });

    contentSlide.addText(
      [{ text: "Photo by Pexels", options: { hyperlink: { url: "https://pexels.com/?utm_source=magicslides.app&utm_medium=presentation", tooltip: "Pexel" }}}],
      { x: "75%", y: "65%", w: 2, h: 0.5, fontSize: 8, color: "#FFFFFF" }
    );
  });

  return pptx;
}

// Execute and return presentation
const pptx = await createPresentation(inputJSON);
return pptx;`);

const [jsonInput, setJsonInput] = useState(JSON.stringify({
    presentationTitle: "Modern Business Strategy",
    presentationSubtitle: "A Comprehensive Analysis of Market Trends and Future Directions", 
    imageSearch: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    slides: [
      {
        title: "Executive Summary",
        sections: [
          "Overview of current market position",
          "Key performance indicators", 
          "Strategic objectives for 2024",
          "Expected outcomes and milestones"
        ],
        imageSearch: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800"
      },
      {
        title: "Market Analysis", 
        sections: [
          "Current market share and competition",
          "Industry trends and growth potential",
          "Target demographic analysis",
          "Market opportunities and challenges"
        ],
        imageSearch: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
      },
      {
        title: "Strategic Initiatives",
        sections: [
          "Digital transformation roadmap",
          "Customer experience enhancement",
          "Operational efficiency improvements", 
          "Innovation and R&D focus areas"
        ],
        imageSearch: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
      },
      {
        title: "Financial Projections",
        sections: [
          "Revenue growth targets",
          "Cost optimization strategies",
          "Investment requirements",
          "Expected ROI calculations"
        ],
        imageSearch: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800"
      },
      {
        title: "Implementation Timeline",
        sections: [
          "Q1 2024: Initial phase rollout",
          "Q2 2024: Market expansion",
          "Q3 2024: Technology integration", 
          "Q4 2024: Performance review"
        ],
        imageSearch: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800"
      }
    ]
   }, null, 2));

  const [activeTab, setActiveTab] = useState('code');
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);



  const generatePresentation = async () => {
    setIsLoading(true);
    try {
      const inputData = JSON.parse(jsonInput);

      const pptx = await new Function('inputJSON', `
        return (async () => {
          ${code.split('return await pptx.exportToBase64();')[0]}
          return pptx;
        })();
      `)(inputData);


      // Download PPTX
      pptx.writeFile({
        fileName: 'presentation.pptx'
      });

    } catch (error) {
      console.error('Error generating presentation:', error);
      alert('Error generating presentation. Check console for details.');
    }
    setIsLoading(false);
  };

 return (
    <div className="flex h-screen bg-gray-100">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div className="w-1/2 p-4 bg-white shadow-lg">
        <div className="flex mb-4 border-b">
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'code' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('code')}
          >
            PPTXGen Code
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'json' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('json')}
          >
            JSON Input
          </button>
        </div>

        <div className="h-full">
          <textarea
            className="w-full h-3/4 p-4 font-mono text-sm border rounded"
            value={activeTab === 'code' ? code : jsonInput}
            onChange={(e) => activeTab === 'code' ? setCode(e.target.value) : setJsonInput(e.target.value)}
            placeholder={activeTab === 'code' ? "PPTXGen Code" : "Presentation JSON"}
          />
          <div className="mt-4 flex justify-between items-center">
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
              onClick={generatePresentation}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Presentation'}
            </button>
            <span className="text-sm text-gray-500">
              {isLoading ? 'This may take a few moments...' : ''}
            </span>
          </div>
        </div>
      </div>

      <div className="w-1/2 p-4 bg-gray-200 overflow-y-auto">
        <h2 className="mb-4 text-xl font-bold">Slide Preview</h2>
        {slides.map((slide, index) => (
          <div key={index} className="mb-4 bg-white rounded shadow-lg">
            <img 
              src={`data:image/png;base64,${slide}`}
              alt={`Slide ${index + 1}`}
              className="w-full"
            />
          </div>
        ))}
        {slides.length === 0 && (
          <div className="p-8 text-center text-gray-500 bg-white rounded">
            No slides generated yet. Click Generate Presentation to create slides.
          </div>
        )}
      </div>
    </div>
  );
};

export default PresentationEditor;