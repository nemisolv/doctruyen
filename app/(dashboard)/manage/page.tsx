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



const page = () => {
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
                        <AddNewStory/>
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
                                <TableRow>
                                    <TableCell >One piece</TableCell>
                                    <TableCell>Manga, Comic</TableCell>
                                    <TableCell className="text-center">1100</TableCell>
                                    <TableCell>Ongoing</TableCell>
                                    <TableCell >2024-10-02</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >One piece</TableCell>
                                    <TableCell>Manga, Comic</TableCell>
                                    <TableCell>1100</TableCell>
                                    <TableCell>Ongoing</TableCell>
                                    <TableCell >2024-10-02</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >One piece</TableCell>
                                    <TableCell>Manga, Comic</TableCell>
                                    <TableCell>1100</TableCell>
                                    <TableCell>Ongoing</TableCell>
                                    <TableCell >2024-10-02</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >One piece</TableCell>
                                    <TableCell>Manga, Comic</TableCell>
                                    <TableCell>1100</TableCell>
                                    <TableCell>Ongoing</TableCell>
                                    <TableCell >2024-10-02</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >One piece</TableCell>
                                    <TableCell>Manga, Comic</TableCell>
                                    <TableCell>1100</TableCell>
                                    <TableCell>Ongoing</TableCell>
                                    <TableCell >2024-10-02</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </CardContent>
                   
                </Card>


            </TabsContent>
        </Tabs>


    </div>
}

export default page;