"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "./ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createComment } from "@/lib/actions/comment.action";
import { RedirectToSignIn, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

interface CommentFormProps {
    chapterId: string;
    storyId: string;
}

const formSchema = z.object({
    content: z.string().min(1, { message: "Comment must be at least 1 character" })
})

export const CommentForm = ({ chapterId, storyId }: CommentFormProps) => {
    const pathname = usePathname();

    const {userId} = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ''
        }
    });

    const {toast} = useToast();
    if(!userId) return <RedirectToSignIn/>


    const isSubmitting = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
       try {
            await createComment({
                chapterId,
                storyId,
                content: data.content,
                clerkId: userId,
                path: pathname
            })
            form.reset();
            toast({
                title: "Success",
                description: "Your comment has been posted",
            })
       }catch(error) {
        console.log(error);
        toast({
            title: "Error",
            description: "An error occurred while posting your comment",
        })

       }
    }


    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                            <Textarea
                                disabled={isSubmitting}
                                {...field} placeholder="Share your thoughts..."
                                className="w-full p-3 border-2"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit"
                disabled={isSubmitting}
            >Post Comment <Send className="ml-2 size-4" /></Button>
        </form>
    </Form>

}