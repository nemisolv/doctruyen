"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Chapter } from "../form/chapter";

export const AddNewChapter = ({storyId}: {storyId:string}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger>
            <Button variant="primary"
                onClick={() => setOpenDialog(true)}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add New Chapter
            </Button>

        </DialogTrigger>
        <DialogContent className="max-w-4xl w-full  bg-white dark:bg-[#313338]">
            <DialogHeader>
                <DialogTitle>Add New Chapter</DialogTitle>
                <DialogDescription>Fill in the details of the chapter</DialogDescription>
            </DialogHeader>
            <Chapter type="add" storyId={storyId} setOpenDialog={setOpenDialog}/>

        </DialogContent>
    </Dialog>
}