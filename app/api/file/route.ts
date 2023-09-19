// import { convertBlobToString } from "@/components/app_components/chat/convertBlobToText";
// import { NextResponse } from "next/server";


// export async function POST(req:Request, res:Response){
//   try{
//   const body = await req.formData();
  
//   console.log(req);
//   console.log("body from conversion",body);
  
//   // const pages = await convertBlobToString(body.blob)
//   // return NextResponse.json({pages})
//   } catch (error){
//     console.log(error);
//     return NextResponse.json({
//       error: error},
//       {status : 500}
//     )
//   }
// }