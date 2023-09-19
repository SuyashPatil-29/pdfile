"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { unknown, z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Inbox } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/supabase/client";
import getDownloadedFiles from "./getDownloadedFiles";
import { reduceText } from "@/lib/reduce-text";

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Your title must be at least 5 characters." })
    .max(50, { message: "Your title must be less than 50 characters." }),
  description: z
    .string()
    .min(5, { message: "Your description must be at least 5 characters." })
    .max(200, { message: "Your title must be less than 200 characters." }),
  source: z.unknown(),
});

const FileUpload = () => {
  const [fileSource, setFileSource] = useState<string | null>(null);
  const [downloadPath, setDownloadPath] = useState("")
  const [text, setText] = useState("");

  const defaultValues = {
    title: "",
    description: "",
    source: unknown, // Initialize source as an empty string
  };

  const { control, handleSubmit, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const router = useRouter();

  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      "application/pdf": ["pdf"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFile) => {
      const { data, error } = await supabase.storage
        .from("pdfile-uploads")
        .upload(`pdfs/${acceptedFile[0].name}`, acceptedFile[0]);
      if (error) {
        console.error(error);
        console.log(error);
        // Update the form's source field with the accepted file
      } else {
        const filename = data.path; // Replace this with your actual filename
        const sanitizedFilename = filename.replace(/ /g, "%20");
        const url = `https://vgfimzfmtiyzwprpdsqq.supabase.co/storage/v1/object/public/pdfile-uploads/${sanitizedFilename}`;
        setValue("source", url);
        setFileSource(url);
        setDownloadPath(filename)
      }
    },
  });

  

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    
    const downloadedFile = await getDownloadedFiles(downloadPath);

    const reader = new FileReader();

    reader.onload = function (event) {
      const newText = event.target!.result as ArrayBuffer;
      const textDecoder = new TextDecoder("utf-8");
      const decodedText = textDecoder.decode(newText);
      const reducedText = reduceText(decodedText)
      data.source = reducedText;
    };
    
    reader.readAsArrayBuffer(downloadedFile as Blob);
    
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      const lastTutorId = responseData.id;

      toast({
        title: "Success",
        description: "Module Created Successfully!",
        variant: "default",
      });
      router.push(`/chat/${lastTutorId}`);
    } else {
      try {
        const responseData = await response.json();
        const errorMessage = responseData.error;

        toast({
          title: "Error!",
          description: errorMessage,
          variant: "destructive",
          action: (
            <ToastAction altText="Login">
              <Link href="/signin">Login</Link>
            </ToastAction>
          ),
        });
      } catch (error) {
        toast({
          title: "Error!",
          description: "An unexpected error occurred.",
          variant: "destructive",
          action: (
            <ToastAction altText="Login">
              <Link href="/signin">Login</Link>
            </ToastAction>
          ),
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black text-white w-[200px]">Add New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Tutor</DialogTitle>
          <DialogDescription>Enter tutor details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input id="title" className="col-span-3" {...field} />
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input id="description" className="col-span-3" {...field} />
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="source" className="text-right">
                Source
              </Label>
              <div className=" pr-4 bg-white w-[300px] rounded-xl">
                <div
                  {...getRootProps({
                    className:
                      "border-dashed border-2 rounded-xl cursor-pointer bg-gray-200 border-blue-500 py-8 flex justify-center items-center flex-col",
                  })}
                >
                  <Input {...getInputProps()} />
                  <>
                    <Inbox className="w-10 h-10 text-blue-500" />
                    <p className="mt-2 text-sm text-slate-400">
                      Click or drop a file to upload
                    </p>
                  </>
                </div>
                {fileSource && (
                  <p className="mt-2 text-sm text-green-500">
                    File uploaded successfully!
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Tutor</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FileUpload;
