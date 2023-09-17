"use client"
import { Input } from '@/components/ui/input'
import { Inbox } from 'lucide-react'
import React from 'react'
import {useDropzone} from "react-dropzone"

const FileUpload = () => {
    const {getInputProps, getRootProps} = useDropzone({
        accept : {'application/pdf': ["pdf"]},
        maxFiles : 1,
        onDrop: (acceptedFile) =>{
            console.log(acceptedFile);
        }
    })
  return (
    <div className=' pr-4 bg-white w-[300px] rounded-xl'>
        <div {...getRootProps({
            className : "border-dashed border-2 rounded-xl cursor-pointer bg-gray-200 border-blue-500 py-8 flex justify-center items-center flex-col"
        })}>
            <Input {...getInputProps()}/>
            <>
            <Inbox className='w-10 h-10 text-blue-500'/>
            <p className='mt-2 text-sm text-slate-400'>Click or drop a file to upload</p>
            </>
        </div>
    </div>
  )
}

export default FileUpload