'use client';
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
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


const formSchema = z.object({
    title: z.string().min(1, { message: "Story name is required" }),
    author: z.string().min(1, { message: "Author name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    genres: z.array(z.string()),
    status: z.enum(["Ongoing", "Completed", "Hiatus"]),
    imgUrl: z.string().url({ message: "Invalid image URL" }),
    isAdult: z.boolean().default(false),
})

export const AddNewStory = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [currentGenre, setCurrentGenre] = useState("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            author: "",
            description: "",
            genres: [],
            // status: "Ongoing",
            // imgUrl: "",
        },
    })

    const genres = form.watch('genres');
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) return null;




    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    const handleGenreKeyDown = (e:KeyboardEvent) => {
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

    return <Dialog>
        <DialogTrigger>
            <Button variant="primary">
                <Plus className="mr-2 size-4" />
                Add New Story</Button>
        </DialogTrigger>
        <DialogContent className='max-w-3xl bg-white dark:bg-slate-700/60 pt-6 '>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className=' grid grid-cols-2 gap-10'>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex items-center gap-x-1'>Title
                                        <span className='text-red-500'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Story name" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex items-center gap-x-1'>Author
                                        <span className='text-red-500'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="description"

                            render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormLabel className='flex items-center gap-x-1'>Description
                                        <span className='text-red-500'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="genres"

                            render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormLabel className='flex items-center gap-x-1'>Genres
                                        <span className='text-red-500'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            value={currentGenre}
                                            onChange={(e) => setCurrentGenre(e.target.value)}
                                            onKeyDown={handleGenreKeyDown}
                                            placeholder="Type a genre and press Enter" />
                                    </FormControl>

                                    <FormMessage />
                                    {
                                        genres.map(genre => (
                                            <Badge
                                                variant="secondary"
                                                className='text-sm'
                                                key={genre}
                                            >{genre}
                                                <span>
                                                    <X className='ml-1 size-4 cursor-pointer' onClick={() => removeGenre(genre)} />
                                                </span>
                                            </Badge>
                                        ))
                                    }
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" variant="primary">Submit</Button>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
}