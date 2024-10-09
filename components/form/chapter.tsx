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
import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { createChapter } from "@/lib/actions/chapter.action";
import { useToast } from "@/hooks/use-toast";
import {Editor as TinyMCEEditor} from 'tinymce'
import { Label } from "../ui/label";
import {  UploadDropzone } from "@/lib/uploadthing";
import { ShowPreviewImages } from "../chapter/show-preview-images";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  

interface ChapterProps {
    type: "add" | "edit";
        storyId: string;
        setOpenDialog?: (open: boolean) => void;
}


const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    chapterNumber: z.number().int().positive("Chapter number must be a positive integer"),
    imgsUrl: z.array(z.string()),
});

export const Chapter = ({ type,storyId,setOpenDialog }: ChapterProps) => {
    const editorRef = useRef<TinyMCEEditor | null>(null); 
    const {theme}= useTheme();
    const {toast} = useToast();
    const [previews,setPreviews] = useState<string[]>([]);

   


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            chapterNumber: 1,
            imgsUrl: [],
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
                imgsUrl: values.imgsUrl || [],
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
                                        value={field.value}
                                        type="number"
                                        onChange={e => {field.onChange(Number(e.target.value))}}
                                         />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                            control={form.control}
                            name="updateSchedule"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-x-1">Update Schedule
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value.length > 0
                                                        ? `${field.value.length} day${field.value.length > 1 ? 's' : ''} selected`
                                                        : "Select update days"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput placeholder="Search update day..." />
                                                <CommandEmpty>No day found.</CommandEmpty>
                                                <CommandGroup>
                                                    {updateDays.map((day) => (
                                                        <CommandItem
                                                            value={day.label}
                                                            key={day.value}
                                                            onSelect={() => {
                                                                const newValue = field.value.includes(day.value)
                                                                    ? field.value.filter((item) => item !== day.value)
                                                                    : [...field.value, day.value];
                                                                form.setValue("updateSchedule", newValue);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    field.value.includes(day.value) ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {day.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
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
                                    initialValue=""
                                    init={{
                                        height: 300,
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
                <div className="grid grids-col-4 items-center gap-4 mt-6">
                    <Label htmlFor="images" className=""> Chapter Images</Label>
                    <div className="col-span-3">
                        <UploadDropzone
                        endpoint="imageUploader"
                        
                        onClientUploadComplete={(res) => {
                            if(res) {
                                const newUrls = res.map((file) => file.url);
                                form.setValue("imgsUrl", [...form.getValues("imgsUrl"), ...newUrls]);
                                setPreviews((prev) => [...prev, ...newUrls]);
                                toast({
                                    title: "Images uploaded successfully",
                                })

                            }
                        
                        }}
                        onUploadError={(error: Error) => {
                            console.log("Error uploading images", error);
                            toast({
                                title: "Oops! Something went wrong",
                            })
                        }}
                        />
                    </div>
                </div>
                {
                    previews.length >0 && (<ShowPreviewImages previews={previews} setPreviews={setPreviews} setImgsUrl={urls => form.setValue("imgsUrl",urls) }/>)
                }
                </TabsContent>
                <Button variant="primary" disabled={isLoading} type="submit">Submit</Button>
            </form>
        </Form>
    </Tabs>
}