import { NextRequest } from "next/server";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

// Optional: Handle unsupported GET
export async function GET() {
  return new Response("Error 500 - Method not allowed", { status: 500 });
}

export async function POST(req: NextRequest) {
  const { html } = await req.json(); 

  // Build the Word document
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: " Foo Bar",
                bold: true,
              }),
              new TextRun({
                text: "\tGithub is the best",
                bold: true,
              }),
            ],
          }),
        ],
      },
    ],
  });

  // Convert to binary buffer
  const buffer = await Packer.toBuffer(doc);

  return new Response(buffer as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": 'attachment; filename="exported.docx"',
    },
  });
}
