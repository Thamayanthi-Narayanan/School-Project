import fs from "fs";
import { PDFParse } from "pdf-parse";

const pdfPath = "docs/School ERP - UI PRD.pdf";
const outPath = "docs/School ERP - UI PRD.extracted.txt";

const data = fs.readFileSync(pdfPath);
const parser = new PDFParse({ data });
const result = await parser.getText();
await parser.destroy();

fs.writeFileSync(outPath, result.text, "utf8");
console.log(`Extracted ${result.total} pages, ${result.text.length} chars`);
console.log(`Written to ${outPath}`);
