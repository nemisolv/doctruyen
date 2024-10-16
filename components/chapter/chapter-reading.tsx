"use client";

import { IChapter } from "@/database/models/chapter.model";
import Image from "next/image";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { useState } from "react";


interface ChapterReadingProps {
    data: IChapter;
}

export const ChapterReading = ({ data }: ChapterReadingProps) => {
    const [readingMode, setReadingMode] = useState<"vertical" | "horizontal">("vertical");
    return <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-3">
            <h1 className="text-xl font-bold truncate">{data.title}</h1>
            <div className="flex items-center space-x-4">
                <span className="text-sm">  Chapter {data.chapterNumber}</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Settings className="size-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Reading Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setReadingMode("vertical")}>
                            Vertical Scrolling
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setReadingMode("horizontal")}>
                            Horizontal Scrolling
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <main className="pt-20 pb-24 px-4">
            <div className={`max-w-4xl mx-auto ${readingMode==="vertical"? "space-y-4": "flex overflow-x-auto"}`}>
                {
                    data?.imgsUrl.map((img, index) => (
                        <div key={index} className={readingMode ==="horizontal"? "flex-shrink-0 mr-4":''}>
                            <Image key={index} className="w-full h-auto" height={1200} width={1200} src={img} alt="" />
                        </div>
                    ))
                }
            </div>
        </main>
    </div>
}