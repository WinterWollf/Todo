export type ToDoFormValues = {
    id?: number;
    title: string;
    description: string;
    done: boolean;
    priority: number;
    tags: { tagId: number }[];
}