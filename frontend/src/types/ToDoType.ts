export type ToDoType = {
    id: number;
    title: string;
    description: string;
    done: boolean;
    priority: number;
    tags: {
        name: string;
        tagId: number
}[];
};
