"use client"
import {  UploadDropzone } from "@/lib/utils";
import Image from "next/image";

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
}

export const ImageUpload = ({value, onChange}: ImageUploadProps) => {
    if(value) {
        return <Image src={value} width={200} height={200} alt="" className="object-cover rounded-lg"/>
    }
    return <UploadDropzone
    className="bg-gray-200"
    endpoint="imageUploader"
    onClientUploadComplete={(res) => {
        onChange(res[0].url)
    }}
    onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
    }}
/>
}