const pptx = require('pptxgenjs');
const presentation = new pptx();

// Theme setup
presentation.layout = 'LAYOUT_WIDE';
presentation.defineLayout({ name: 'CUSTOM', width: 13.333, height: 7.5 });

const THEME = {
    colors: {
        primary: '1a237e',
        secondary: '0091ea',
        accent: '9e9e9e',
        highlight: '00bcd4',
        text: 'ffffff'
    },
    fonts: {
        heading: 'Orbitron',
        subheading: 'Rajdhani',
        body: 'Roboto'
    }
};

// Title Slide
let slide = presentation.addSlide();
slide.background = { path: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb' };
slide.addText('7 Sci-fi AI and Robotics', {
    x: 0.5,
    y: 0.5,
    w: '90%',
    h: 1.5,
    fontSize: 72,
    color: THEME.colors.text,
    fontFace: THEME.fonts.heading,
    align: 'center',
    bold: true,
    glow: { size: 10, color: THEME.colors.highlight, opacity: 0.5 }
});
slide.addText('in Defence for 2025', {
    x: 0.5,
    y: 2.2,
    w: '90%',
    h: 1,
    fontSize: 48,
    color: THEME.colors.text,
    fontFace: THEME.fonts.subheading,
    align: 'center'
});

// Technology Slides
const technologies = [
    {
        title: 'Autonomous Combat Drones',
        image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008',
        description: 'Next-generation autonomous drones with advanced AI capabilities'
    },
    {
        title: 'AI-Powered Battlefield Analysis',
        image: 'https://images.unsplash.com/photo-1607723619359-27a6e3f0b116',
        description: 'Real-time strategic analysis using artificial intelligence'
    },
    {
        title: 'Robotic Combat Units',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
        description: 'Advanced robotic units for high-risk combat scenarios'
    },
    {
        title: 'Neural Interface Systems',
        image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008',
        description: 'Direct neural control systems for military equipment'
    },
    {
        title: 'Quantum Computing Defense',
        image: 'https://images.unsplash.com/photo-1607723619359-27a6e3f0b116',
        description: 'Quantum-powered cybersecurity and encryption systems'
    },
    {
        title: 'AI Cyber Defense Networks',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
        description: 'Self-learning networks for advanced cyber warfare'
    },
    {
        title: 'Smart Combat Armor',
        image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008',
        description: 'AI-enhanced protective systems with reactive capabilities'
    }
];

technologies.forEach((tech, index) => {
    let slide = presentation.addSlide();
    
    // Background with gradient overlay
    slide.background = { 
        color: THEME.colors.primary,
        gradient: {
            type: 'linear',
            stops: [
                { color: THEME.colors.primary, position: 0 },
                { color: THEME.colors.secondary, position: 100 }
            ]
        }
    };

    // Left side: Image
    slide.addImage({
        path: tech.image,
        x: 0,
        y: 0,
        w: '50%',
        h: '100%',
        sizing: { type: 'cover' }
    });

    // Right side: Content
    slide.addText(`${index + 1}. ${tech.title}`, {
        x: '52%',
        y: '20%',
        w: '45%',
        fontSize: 44,
        color: THEME.colors.text,
        fontFace: THEME.fonts.heading,
        bold: true
    });

    slide.addText(tech.description, {
        x: '52%',
        y: '40%',
        w: '45%',
        fontSize: 32,
        color: THEME.colors.text,
        fontFace: THEME.fonts.body
    });
});

// Save presentation
presentation.writeFile('sdq3222qwrew.pptx');