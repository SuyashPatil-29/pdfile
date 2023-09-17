import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';
import PdfParser from 'pdf-parse';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res:NextApiResponse){
  try {
    const chunks: Uint8Array[] = [];
    req.on('data', (chunk: Uint8Array) => {
      chunks.push(chunk);
    });

    req.on('end', async () => {
      const pdfBuffer = Buffer.concat(chunks);

      // Perform PDF parsing here using pdf-parse
      const pdfText = await parsePdf(pdfBuffer);

      res.status(200).json({ pdfText });
    });
  } catch (error) {
    console.error('Error parsing PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 

async function parsePdf(pdfBuffer: Buffer) {
  const pdfText = await PdfParser(pdfBuffer);
  return pdfText.text;
}