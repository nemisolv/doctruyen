import PageNotFound from "@/app/not-found";
import { RenderGenre } from "@/components/render-genre";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { findStoryPreview } from "@/lib/actions/story.action";
import { Book, BookOpen, BookX, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const page = async ({ searchParams }: { searchParams: { _id: string } }) => {
    if (!searchParams) return null;

    const { _id } = searchParams;
    if (!_id) return null;

    const story = await findStoryPreview({ _id });
    if (!story) return <PageNotFound />
    return (
        <div className="container mx-auto py-6">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <div>
                        <Image src={story.imgUrl} alt={story.title} width={300} height={400} className="rounded-lg object-cover" />
                        <div className="flex flex-col justify-between">
                            <div>
                                <CardTitle className="text-3xl mb-2">{story.title}</CardTitle>
                                <CardDescription>by {story.author}</CardDescription>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {
                                        story.genres.map((genre) => (
                                            <RenderGenre key={genre._id.toString()} _id={genre._id.toString()} name={genre.name} />
                                        ))
                                    }
                                </div>

                            </div>
                            <div className="flex gap-4 mt-4">
                                <div className="flex items-center">
                                    <Book className="size-4 mr-2" />
                                    <span className="capitalize">{story.status}</span>
                                </div>
                                <div className="flex items-center">
                                    <Star className="size-4 mr-2" />
                                    <span className="capitalize">{story.averageRating}</span>
                                </div>

                                <div className="flex items-center">
                                    <Users className="size-4 mr-2" />
                                    <span className="capitalize">{story.averageRating}</span>
                                </div>

                                {story.isAdult && <div className="flex items-center">
                                    <BookX className="size-4 mr-2" />
                                    <span className="capitalize">18+</span>
                                </div>}
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <Tabs defaultValue="chapters">
                        <TabsList>
                            <TabsTrigger value="chapters">Chapters</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                        </TabsList>

                        <TabsContent value="chapters">
                            <ScrollArea className="w-full max-h-[400px] rounded-md border p-4">
                                {story.chapters.map(chapter => (
                                    <div key={chapter._id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                        <div>
                                            <h3 className="font-semibold">Chapter {chapter.chapterNumber}: {chapter.title}</h3>
                                            {chapter.releaseDate && <span className="text-sm text-muted-foreground">Release Date: {chapter.releaseDate}</span>}
                                        </div>
                                        <Link href={`/reader/${story._id}/${chapter._id}`} className="bg-primary hover:bg-primary/90 text-white rounded-lg min-w-[90px] flex items-center justify-center py-2 px-3">
                                            <BookOpen className="size-4 mr-2" />
                                            Read</Link>
                                    </div>
                                ))}
                            </ScrollArea>


                        </TabsContent>

                        <TabsContent value="details">
                            <div className="space-y-5">
                                <div>
                                    <h3 className="font-semibold">Status</h3>
                                    <p className="capitalize">{story.status}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Description</h3>
                                    <p className="text-sm text-muted-foreground italic">{story.description}</p>
                                </div>
                            </div>

                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">
                       <Link href={`/reader/${story._id}/${story.chapters[0]._id}`}>Start Reading</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default page;