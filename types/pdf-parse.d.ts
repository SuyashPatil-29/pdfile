// pdf-parse.d.ts

declare module 'pdf-parse' {
    function pdfParse(
      dataBuffer: Buffer,
      options?: PdfParse.Options
    ): Promise<PdfParse.Result>;
  
    namespace PdfParse {
      interface Options {
        // Define any options here if needed
      }
  
      interface Result {
        text: any;
        // Define the structure of the result object here
      }
    }
  
    export = pdfParse;
  }