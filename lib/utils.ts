import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";


export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
