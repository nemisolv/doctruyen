import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AddNewStory } from "@/components/story/add-new-story";
import { findAllStories } from "@/lib/actions/story.action";
import {Badge} from "@/components/ui/badge";
import { RenderGenre } from "@/components/render-genre";
import { IGenre } from "@/database/models/genre.model";




const page = async () => {
    const stories = await findAllStories() || [];
    console.log("stories::",stories);

    return <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        <Tabs defaultValue="stories" className="space-y-4 ">
            <TabsList>
                <TabsTrigger value="stories">Stories</TabsTrigger>
                <TabsTrigger value="chapters">Chapters</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>

            </TabsList>
            {/* stories tab */}
            <TabsContent value="stories" className="w-full">
                <div className="space-y-4 mb-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Manage Stories</h2>
                        <AddNewStory />
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Stories</CardTitle>
                        <CardDescription>A list of recently added or updated manga and comic series.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead >Name</TableHead>
                                    <TableHead>Genres</TableHead>
                                    <TableHead>Chapters</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last updated</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stories.map(story => (
                                    <TableRow key={story._id}>
                                        <TableCell >{story.title}</TableCell>
                                        <TableCell className="flex items-center gap-1">
                                            {story.genres.map((genre: IGenre) => (
                                                <RenderGenre key={genre._id} _id={genre._id} name={genre.name} />
                                            ))}
                                        </TableCell>
                                        <TableCell className="text-center">{story.chapters.length}</TableCell>
                                        <TableCell>{story.status}</TableCell>
                                        <TableCell >
                                            {new Date(story.updatedAt).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })}


                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>

                    </CardContent>

                </Card>


            </TabsContent>
        </Tabs>


    </div>
}

export default page;