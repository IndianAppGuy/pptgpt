import PptxGenJS from 'pptxgenjs';

// Initialize PptxGenJS
const pptx = new PptxGenJS();

// Set default presentation properties
pptx.layout = 'LAYOUT_WIDE';

// Custom theme colors
const THEME = {
    primary: '2D3436',
    secondary: '0984E3',
    accent: '00CEC9',
    light: 'FFFFFF',
    dark: '2D3436'
};

// Slide 1: Title Slide
let slide1 = pptx.addSlide();
// Add background rectangle
slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: '100%', h: '100%',
    fill: { color: THEME.primary },
    opacity: 0.1
});
// Add diagonal shape for modern aesthetic
slide1.addShape(pptx.shapes.RIGHT_TRIANGLE, {
    x: '70%', y: '-10%', w: 8, h: 8,
    fill: { color: THEME.secondary },
    opacity: 0.1,
    rotate: 45
});
// Company name
slide1.addText("NEXUS AI", {
    x: '10%', y: '30%', w: '80%',
    fontSize: 72,
    color: THEME.dark,
    fontFace: 'Montserrat',
    bold: true
});
// Tagline
slide1.addText("Revolutionizing Enterprise Intelligence", {
    x: '10%', y: '50%', w: '80%',
    fontSize: 36,
    color: THEME.secondary,
    fontFace: 'Montserrat'
});

// Slide 2: Problem Statement
let slide2 = pptx.addSlide();
// Add background
slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: '100%', h: '100%',
    fill: { color: THEME.light }
});
// Title
slide2.addText("The Problem", {
    x: '10%', y: '10%',
    fontSize: 44,
    color: THEME.dark,
    fontFace: 'Montserrat',
    bold: true
});
// Problem statements with icons
const problems = [
    "85% of enterprise data remains unstructured and unused",
    "Traditional AI solutions require extensive customization",
    "High implementation costs and long deployment times"
];
problems.forEach((problem, idx) => {
    slide2.addShape(pptx.shapes.OVAL, {
        x: '10%', y: `${30 + idx * 20}%`,
        w: 0.5, h: 0.5,
        fill: { color: THEME.secondary }
    });
    slide2.addText(problem, {
        x: '15%', y: `${30 + idx * 20}%`,
        w: '70%',
        fontSize: 24,
        color: THEME.dark,
        fontFace: 'Montserrat',
        bullet: { type: 'number' }
    });
});

// Slide 3: Solution
let slide3 = pptx.addSlide();
// Modern geometric background
slide3.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: '100%', h: '100%',
    fill: { color: THEME.light }
});
slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: '60%', y: '10%', w: '50%', h: '90%',
    fill: { color: THEME.secondary },
    opacity: 0.1,
    radius: 0.05
});
// Title
slide3.addText("Our Solution", {
    x: '10%', y: '10%',
    fontSize: 44,
    color: THEME.dark,
    fontFace: 'Montserrat',
    bold: true
});

// Solution features
const solutions = [
    {
        title: "Adaptive AI Engine",
        desc: "Self-learning system that adapts to enterprise needs"
    },
    {
        title: "Plug & Play Integration",
        desc: "Deploy within days, not months"
    },
    {
        title: "Cost-Effective Scaling",
        desc: "Pay only for what you use"
    }
];

solutions.forEach((solution, idx) => {
    slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: '10%', y: `${30 + idx * 20}%`,
        w: 4, h: 1.5,
        fill: { color: THEME.light },
        line: { color: THEME.secondary, width: 2 },
        radius: 0.05
    });
    slide3.addText([
        { text: solution.title + "\n", options: { bold: true, fontSize: 24 } },
        { text: solution.desc, options: { fontSize: 18 } }
    ], {
        x: '12%', y: `${31 + idx * 20}%`,
        w: '36%',
        color: THEME.dark,
        fontFace: 'Montserrat'
    });
});

// Slide 4: Market Opportunity
let slide4 = pptx.addSlide();
// Background
slide4.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: '100%', h: '100%',
    fill: { color: THEME.light }
});
// Title
slide4.addText("Market Opportunity", {
    x: '10%', y: '10%',
    fontSize: 44,
    color: THEME.dark,
    fontFace: 'Montserrat',
    bold: true
});
// Market size visualization
slide4.addShape(pptx.shapes.OVAL, {
    x: '50%', y: '30%',
    w: 4, h: 4,
    fill: { color: THEME.secondary }
});
slide4.addText("$50B", {
    x: '50%', y: '40%',
    w: 4,
    fontSize: 48,
    color: THEME.light,
    fontFace: 'Montserrat',
    bold: true,
    align: 'center'
});
// Market stats
const marketStats = [
    "Enterprise AI market growing at 35% CAGR",
    "87% of enterprises planning AI adoption",
    "Expected to reach $150B by 2025"
];
marketStats.forEach((stat, idx) => {
    slide4.addText(stat, {
        x: '10%', y: `${30 + idx * 15}%`,
        w: '35%',
        fontSize: 24,
        color: THEME.dark,
        fontFace: 'Montserrat',
        bullet: { type: 'dot' }
    });
});

// Slide 5: Traction
let slide5 = pptx.addSlide();
// Background
slide5.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: '100%', h: '100%',
    fill: { color: THEME.light }
});
// Title
slide5.addText("Traction", {
    x: '10%', y: '10%',
    fontSize: 44,
    color: THEME.dark,
    fontFace: 'Montserrat',
    bold: true
});
// Key metrics
const metrics = [
    { label: "Enterprise Clients", value: "50+" },
    { label: "Revenue Growth", value: "300%" },
    { label: "User Satisfaction", value: "98%" }
];
metrics.forEach((metric, idx) => {
    slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: `${10 + idx * 30}%`, y: '30%',
        w: 3, h: 2,
        fill: { color: THEME.light },
        line: { color: THEME.secondary, width: 2 },
        radius: 0.05
    });
    slide5.addText([
        { text: metric.value + "\n", options: { bold: true, fontSize: 48, color: THEME.secondary } },
        { text: metric.label, options: { fontSize: 24, color: THEME.dark } }
    ], {
        x: `${10 + idx * 30}%`, y: '35%',
        w: '25%',
        align: 'center',
        fontFace: 'Montserrat'
    });
});

// Slide 6: Team
let slide6 = pptx.addSlide();
// Background
slide6.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: '100%', h: '100%',
    fill: { color: THEME.light }
});
slide6.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: '80%', w: '100%', h: '20%',
    fill: { color: THEME.secondary },
    opacity: 0.1
});
// Title
slide6.addText("Leadership Team", {
    x: '10%', y: '10%',
    fontSize: 44,
    color: THEME.dark,
    fontFace: 'Montserrat',
    bold: true
});
// Team members
const team = [
    {
        name: "Sarah Chen, PhD",
        role: "CEO & Founder",
        background: "Ex-Google AI, Stanford"
    },
    {
        name: "Alex Rivera",
        role: "CTO",
        background: "Ex-Microsoft, MIT"
    },
    {
        name: "Dr. James Kim",
        role: "Head of AI",
        background: "Ex-OpenAI, Berkeley"
    }
];
team.forEach((member, idx) => {
    slide6.addShape(pptx.shapes.OVAL, {
        x: `${10 + idx * 30}%`, y: '30%',
        w: 2, h: 2,
        fill: { color: THEME.secondary }
    });
    slide6.addText([
        { text: member.name + "\n", options: { bold: true, fontSize: 24 } },
        { text: member.role + "\n", options: { fontSize: 20, color: THEME.secondary } },
        { text: member.background, options: { fontSize: 16, color: THEME.dark } }
    ], {
        x: `${10 + idx * 30}%`, y: '60%',
        w: '25%',
        align: 'center',
        fontFace: 'Montserrat'
    });
});

// Slide 7: Investment Ask
let slide7 = pptx.addSlide();
// Background
slide7.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: '100%', h: '100%',
    fill: { color: THEME.light }
});
// Title
slide7.addText("Investment Opportunity", {
    x: '10%', y: '10%',
    fontSize: 44,
    color: THEME.dark,
    fontFace: 'Montserrat',
    bold: true
});
// Investment details
slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: '10%', y: '30%',
    w: 8, h: 4,
    fill: { color: THEME.light },
    line: { color: THEME.secondary, width: 2 },
    radius: 0.05
});
slide7.addText([
    { text: "Raising $5M Series B\n\n", options: { bold: true, fontSize: 36, color: THEME.secondary } },
    { text: "Use of Funds:\n", options: { bold: true, fontSize: 24, color: THEME.dark } },
    { text: "• Product Development: 40%\n", options: { fontSize: 20 } },
    { text: "• Market Expansion: 35%\n", options: { fontSize: 20 } },
    { text: "• Team Growth: 25%", options: { fontSize: 20 } }
], {
    x: '15%', y: '35%',
    w: '70%',
    fontFace: 'Montserrat',
    color: THEME.dark
});

// Save the presentation
pptx.writeFile('NexusAI_Series_B_Pitch.pptx');