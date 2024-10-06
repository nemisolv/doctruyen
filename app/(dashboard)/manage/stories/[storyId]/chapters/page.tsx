import { AddNewChapter } from "@/components/chapter/add-new-chapter";
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
import { findAllChapterByStoryId } from "@/lib/actions/chapter.action";

const page = async ({ params }: { params: { storyId: string } }) => {
    if (!params.storyId) {
        return <div>Story not found</div>
    }
    const chapters = await findAllChapterByStoryId({ storyId: params.storyId }) || [];
    return (
        <div className="mx-auto py-10 container">
             <div className="space-y-4 mb-4">
                    <div className="flex justify-between items-center">
                        <AddNewChapter storyId={params.storyId} />
                    </div>
                </div>
            <Card>
                <CardHeader>
                    <CardTitle>Chapter List</CardTitle>
                    <CardDescription>Manage chapters for this story</CardDescription>
                </CardHeader>
                <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead >Title</TableHead>
                                    <TableHead>Chapter number</TableHead>
                                    <TableHead>Last updated</TableHead>
                                    <TableHead>Actions</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {chapters.map(chaper => (
                                    <TableRow key={chaper._id.toString()}>
                                        <TableCell >{chaper.title}</TableCell>
                                        <TableCell >{chaper.chapterNumber}</TableCell>
                                        <TableCell >
                                            {new Date(chaper.updatedAt).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                        </TableCell>
                                        <TableCell>
                                           {/* <ActionStory _id={chaper._id}/> */}
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>

                    </CardContent>

            </Card>

        </div>
    );
}

export default page;