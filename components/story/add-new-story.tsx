'use client';
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

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

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from 'react-hook-form';
import { Plus, X } from 'lucide-react';
import { KeyboardEvent, useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { storyStatus } from '@/constants';
import { ImageUpload } from '../image-upload';
import { createStory } from '@/lib/actions/story.action';
import { useAuth } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';




const formSchema = z.object({
    title: z.string().min(1, { message: "Story name is required" }),
    author: z.string().min(1, { message: "Author name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    genres: z.array(z.string()),
    status: z.enum(["Ongoing", "Completed", "Hiatus"]),
    imgUrl: z.string().url({ message: "Invalid image URL" }),
    isAdult: z.boolean().default(false).optional(),
})

export const AddNewStory = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [currentGenre, setCurrentGenre] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const {userId} = useAuth();
    const {toast} = useToast();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            author: "",
            description: "",
            genres: [],
            status: "Ongoing",
            imgUrl: "",
            isAdult: false,
        },
    })

    const genres = form.watch('genres');
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) return null;

    if(!userId) return null;




    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        const path = "/manage"
        await createStory({clerkId:userId, data:values,path});
        form.reset();
        setOpenDialog(false);
        toast({
            title: 'Story created',
            description: "The story has been successfully created.",
        })
      }catch(error) {
        console.log('Error creating story:', error);
        toast({
            title: 'Error creating story',
            description: "An error occurred while creating the story.",
        })
      }
    }

    const handleGenreKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && currentGenre.trim() !== "") {
            e.preventDefault();
            if (!genres.includes(currentGenre.trim())) {
                form.setValue('genres', [...genres, currentGenre.trim()])
                setCurrentGenre("");
            }
        }
    }
    const removeGenre = (genre: string) => {
        form.setValue('genres', genres.filter(g => g !== genre))
    }

    return <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger>
            <Button variant="primary"
            onClick={() => setOpenDialog(true)}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add New Story
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl bg-white dark:bg-black pt-6 w-full rounded-lg shadow-lg">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title Field */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-x-1">Title
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Story name" {...field} className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Author Field */}
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-x-1">Author
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Author name" {...field} className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Adult Content Switch */}
                        <FormField
                            control={form.control}
                            name="isAdult"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="flex items-center gap-x-1">Adult Content</FormLabel>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Status Dropdown */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-x-1">Status</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white dark:bg-gray-800">
                                                {storyStatus.map((status) => (
                                                    <SelectItem key={status.value} value={status.value}>
                                                        {status.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Image URL Field */}
                        <FormField
                            control={form.control}
                            name="imgUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-x-1">Image URL</FormLabel>
                                    <FormControl >
                                        <ImageUpload
                                            value={field.value}
                                            onChange={field.onChange}

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description Field */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="col-span-1 md:col-span-2">
                                    <FormLabel className="flex items-center gap-x-1">Description
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Story description" {...field} className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Genres Field */}
                        <FormField
                            control={form.control}
                            name="genres"
                            render={({  }) => (
                                <FormItem className="col-span-1 md:col-span-2">
                                    <FormLabel className="flex items-center gap-x-1">Genres
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            value={currentGenre}
                                            onChange={(e) => setCurrentGenre(e.target.value)}
                                            onKeyDown={handleGenreKeyDown}
                                            placeholder="Type a genre and press Enter"
                                            className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {genres.map((genre) => (
                                            <Badge key={genre} variant="secondary" className="text-sm">
                                                {genre}
                                                <X className="ml-1 h-4 w-4 cursor-pointer" onClick={() => removeGenre(genre)} />
                                            </Badge>
                                        ))}
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" variant="primary" className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>
        </DialogContent>
    </Dialog>

}