"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from "react";
import { useTheme } from "next-themes";
import { createChapter } from "@/lib/actions/chapter.action";
import { useToast } from "@/hooks/use-toast";

interface ChapterProps {
    type: "add" | "edit";
        storyId: string;
        setOpenDialog?: (open: boolean) => void;
}


const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    chapterNumber: z.number().int().positive("Chapter number must be a positive integer"),
});

export const Chapter = ({ type,storyId,setOpenDialog }: ChapterProps) => {
    const editorRef = useRef(null);
    const {theme}= useTheme();
    const {toast} = useToast();

   


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            chapterNumber: 1,
        },
    })
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const path = `/manage/stories/${storyId}/chapters`;
        try {
            await createChapter({storyId, data: {
                title: values.title,
                content: values.content,
                chapterNumber: values.chapterNumber,
            },path})
            form.reset();
            toast({
                title: type === 'add' ? "Chapter created successfully" : "Chapter updated successfully",
            })
            if (setOpenDialog) {
                setOpenDialog(false);
            }


        }catch(error) {
            console.log(error);
            toast({
                title: "Oops! Something went wrong",
            })
        }
    }

    return <Tabs defaultValue="chapter">
        <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            {type === 'edit' && <TabsTrigger value="comments">Comemnts</TabsTrigger>}
        </TabsList>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <TabsContent value="details">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-x-1">Title
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="chapterNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-x-1">Chapter Number
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                </TabsContent>
               
                <TabsContent value="content">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-x-1">Content
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Editor
                                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                                    onInit={(_evt, editor) => editorRef.current = editor}
                                    onBlur={field.onBlur}
                                    onEditorChange={field.onChange}
                                    initialValue="<p>This is the initial content of the editor.</p>"
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                        skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
                                        content_css: theme === 'dark' ? 'dark' : 'default',
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </TabsContent>
                <Button variant="primary" disabled={isLoading} type="submit">Submit</Button>
            </form>
        </Form>
    </Tabs>
}