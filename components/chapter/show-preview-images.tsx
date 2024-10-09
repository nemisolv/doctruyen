"use client";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
  

interface ShowPreviewImagesProps {
    previews: string[];
    setPreviews: React.Dispatch<React.SetStateAction<string[]>>;
    setImgsUrl: (urls: string[]) => void;

}

export const ShowPreviewImages = ({ previews, setPreviews, setImgsUrl }: ShowPreviewImagesProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handlePrevious = () => {
        setCurrentImageIndex(prevIndex => prevIndex >0 ? prevIndex -1 : previews.length -1);
    }

    const handleNext = () => {
        setCurrentImageIndex(prevIndex => prevIndex < previews.length -1 ? prevIndex +1 : 0);
    }

    const removeImage = (index:number) => {
        const newPreviews = previews.filter((_, i) => i !== index);
        setPreviews(newPreviews);
        setImgsUrl(newPreviews);
    }



    return <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Preview Images</Button>
        </DialogTrigger>
        <DialogContent className="max-w-7xl h-[90vh] mx-auto flex flex-col justify-center items-center">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md bg-muted">
                {currentImageIndex + 1} / {previews.length}
            </div>
                <div className="relative h-full flex flex-col w-full">
                    <div className="flex items-center justify-center flex-grow relative">
                        <Button variant="ghost" size="icon" className="absolute left-2 z-10"
                        onClick={handlePrevious}>
                            <ChevronLeft className="size-4"/>
                        </Button>
                        <div className="w-full h-full relative">                    
                            <Image src={previews[currentImageIndex]}
                            alt={`Preview ${currentImageIndex}`}
                            fill
                            className="object-contain rounded-md" 
                            />

                        </div>
                        <Button variant="ghost" size="icon" className="absolute right-2 z-10"
                        onClick={handleNext}>
                            <ChevronRight className="size-4"/>
                        </Button>
                    </div>

                    <ScrollArea className="h-[150px] w-full border-t">
                        <div className="flex p-4 space-x-4">
                            {previews.map((preview, index) => (
                                <div key={index} className={cn('relative w-24 h-32 cursor-pointer', index === currentImageIndex ? "ring-2 ring-primary": "")}
                                
                                onClick={() => setCurrentImageIndex(index)}
                                >
                                    <Image src={preview} alt={`Preview ${index}`} fill className="object-cover rounded-md" />
                                    <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 z-10"
                                    onClick={e => {
                                        e.stopPropagation();
                                        removeImage(index);
                                    }} >
                                        <X className="size-4"/>
                                    </Button>
                                    <div className="absolute bottom-0 left-0 right-0 bg-background/80 text-xs p-1 text-center truncate">
                                    Page {index +1}</div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
        </DialogContent>
    </Dialog>
}