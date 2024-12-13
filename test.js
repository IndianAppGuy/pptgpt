import PptxGenJS from "pptxgenjs";
const pptx = new PptxGenJS();


pptx.defineSlideMaster({
  title: "MASTER_SLIDE",
  background: { color: "FFFFFF" },
  objects: [
    {
      placeholder: {
        options: { name: "title", type: "title", x: 0.5, y: 0.7, w: 9, h: 0.8 },
        text: "",
      },
    },
  ],
});

// Title Slide
let slide1 = pptx.addSlide();
slide1.background = { path: "https://images.unsplash.com/photo-1501854140801-50d01698950b" };
slide1.addText("Nature & Wildlife", {
  x: 0.5,
  y: 2,
  w: 9,
  h: 2,
  fontSize: 72,
  color: "FFFFFF",
  fontFace: "Montserrat",
  bold: true,
  align: "center",
});
slide1.addText("An Exploration of Earth's Beauty", {
  x: 0.5,
  y: 4,
  w: 9,
  h: 1,
  fontSize: 36,
  color: "FFFFFF",
  fontFace: "Montserrat",
  align: "center",
});

// Forest Ecosystems Slide
let slide2 = pptx.addSlide();
slide2.background = { color: "1A472A" };
slide2.addText("Forest Ecosystems", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.8,
  fontSize: 44,
  color: "FFFFFF",
  fontFace: "Montserrat",
  bold: true,
});
slide2.addImage({
  path: "https://images.unsplash.com/photo-1511497584788-876760111969",
  x: 0.5,
  y: 1.5,
  w: 4.3,
  h: 3.2,
});
slide2.addImage({
  path: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
  x: 5.2,
  y: 1.5,
  w: 4.3,
  h: 3.2,
});
slide2.addText([
  { text: "• Home to 80% of terrestrial biodiversity", fontSize: 20, bullet: true },
  { text: "• Crucial for climate regulation", fontSize: 20, bullet: true },
  { text: "• Provides habitat for countless species", fontSize: 20, bullet: true },
], {
  x: 0.5,
  y: 5,
  w: 9,
  h: 1.5,
  color: "FFFFFF",
  fontFace: "Arial",
});

// Marine Life Slide
let slide3 = pptx.addSlide();
slide3.background = { color: "003366" };
slide3.addText("Marine Ecosystems", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.8,
  fontSize: 44,
  color: "FFFFFF",
  fontFace: "Montserrat",
  bold: true,
});
slide3.addShape(pptx.ShapeType.rect, {
  x: 0.5,
  y: 1.5,
  w: 9,
  h: 3.5,
  fill: { type: "solid", color: "FFFFFF", alpha: 10 },
});
slide3.addImage({
  path: "https://images.unsplash.com/photo-1544552866-d3ed42536d1f",
  x: 1,
  y: 1.8,
  w: 8,
  h: 3,
});
slide3.addText([
  { text: "Oceans cover 71% of Earth's surface", fontSize: 20 },
  { text: "Contains 97% of Earth's water", fontSize: 20 },
  { text: "Home to millions of species", fontSize: 20 },
], {
  x: 0.5,
  y: 5.2,
  w: 9,
  h: 1.2,
  color: "FFFFFF",
  fontFace: "Arial",
  bullet: true,
});

// Wildlife Diversity Slide
let slide4 = pptx.addSlide();
slide4.background = { color: "4A2545" };
slide4.addText("Wildlife Diversity", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.8,
  fontSize: 44,
  color: "FFFFFF",
  fontFace: "Montserrat",
  bold: true,
});
slide4.addImage({
  path: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7",
  x: 0.5,
  y: 1.5,
  w: 2.8,
  h: 3.5,
});
slide4.addImage({
  path: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46",
  x: 3.6,
  y: 1.5,
  w: 2.8,
  h: 3.5,
});
slide4.addImage({
  path: "https://images.unsplash.com/photo-1531959870249-9f9b729efcf4",
  x: 6.7,
  y: 1.5,
  w: 2.8,
  h: 3.5,
});
slide4.addText("8.7 Million Species Estimated Globally", {
  x: 0.5,
  y: 5.2,
  w: 9,
  h: 0.5,
  fontSize: 24,
  color: "FFFFFF",
  fontFace: "Arial",
  align: "center",
});

// Conservation Slide
let slide5 = pptx.addSlide();
slide5.background = { color: "2F4F4F" };
slide5.addText("Conservation Efforts", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.8,
  fontSize: 44,
  color: "FFFFFF",
  fontFace: "Montserrat",
  bold: true,
});
slide5.addShape(pptx.ShapeType.rect, {
  x: 0.5,
  y: 1.5,
  w: 4.3,
  h: 3.2,
  fill: { type: "solid", color: "FFFFFF", alpha: 10 },
});
slide5.addText([
  { text: "Current Challenges:", fontSize: 24, bold: true },
  { text: "• Climate Change", fontSize: 20, bullet: true },
  { text: "• Habitat Loss", fontSize: 20, bullet: true },
  { text: "• Pollution", fontSize: 20, bullet: true },
  { text: "• Overexploitation", fontSize: 20, bullet: true },
], {
  x: 0.7,
  y: 1.7,
  w: 3.9,
  h: 2.8,
  color: "FFFFFF",
  fontFace: "Arial",
});
slide5.addShape(pptx.ShapeType.rect, {
  x: 5.2,
  y: 1.5,
  w: 4.3,
  h: 3.2,
  fill: { type: "solid", color: "FFFFFF", alpha: 10 },
});
slide5.addText([
  { text: "Solutions:", fontSize: 24, bold: true },
  { text: "• Protected Areas", fontSize: 20, bullet: true },
  { text: "• Species Recovery Programs", fontSize: 20, bullet: true },
  { text: "• Sustainable Practices", fontSize: 20, bullet: true },
  { text: "• Education & Awareness", fontSize: 20, bullet: true },
], {
  x: 5.4,
  y: 1.7,
  w: 3.9,
  h: 2.8,
  color: "FFFFFF",
  fontFace: "Arial",
});
slide5.addText("Together We Can Make a Difference", {
  x: 0.5,
  y: 5.2,
  w: 9,
  h: 0.5,
  fontSize: 28,
  color: "FFFFFF",
  fontFace: "Montserrat",
  align: "center",
  bold: true,
});

// Final Call to Action Slide
let slide6 = pptx.addSlide();
slide6.background = { path: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e" };
slide6.addText("Protect Our Natural World", {
  x: 0.5,
  y: 2,
  w: 9,
  h: 1.5,
  fontSize: 64,
  color: "FFFFFF",
  fontFace: "Montserrat",
  bold: true,
  align: "center",
});
slide6.addText("Every Action Counts", {
  x: 0.5,
  y: 3.5,
  w: 9,
  h: 0.8,
  fontSize: 36,
  color: "FFFFFF",
  fontFace: "Montserrat",
  align: "center",
});

// Save the presentation
pptx.writeFile("Nature_and_Wildlife_11.pptx");