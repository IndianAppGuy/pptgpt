const pptxgen = require('pptxgenjs');
const fs = require('fs').promises;

async function convertPptxToImages() {
    const pres = new pptxgen();

    // Add a slide with text
    let slide1 = pres.addSlide();
    slide1.addText("Hello World!", {
        x: 1,
        y: 1,
        w: 8,
        h: 1,
        fontSize: 24
    });

    // Add a slide with an image
    

    // Export slides as images
    const opts = {
        outputType: 'BASE64',
        format: 'PNG'
    };

    // Generate and save each slide as an image
    
    for (let i = 0; i < 1; i++) {
        const imageData = await slide1.exportImage(opts);
        await fs.writeFile(`slide_${i + 1}.png`, imageData, 'base64');
    }
}

convertPptxToImages().catch(console.error);