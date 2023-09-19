import { supabase } from "@/supabase/client";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import pdf from "pdf-parse"

const getDownloadedFiles = async (url: string) => {
  const { data, error } = await supabase.storage
    .from("pdfile-uploads")
    .download(url);

    console.log(data);
    return data
    
}


export default getDownloadedFiles;
