import { ToDoFormValues } from "../../types/ToDoFormValues";
import { useToDoForm } from "./hooks/useToDoForm";
import { Button, Checkbox, Group, Paper, Stack, Textarea, TextInput, Notification, Rating, Text, MultiSelect } from "@mantine/core";
import { IconX, IconCheck } from '@tabler/icons-react';
import { createTodo } from "./api/create-todo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTags } from "../tags/api/get-tags.ts";
import {TagType} from "../../types/TagType.ts";

export const ToDoForm = () => {
    const navigate = useNavigate();
    const form = useToDoForm();
    const [value, setValue] = useState(1);

    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | null, show: boolean }>({
        message: '',
        type: null,
        show: false,
    });

    const [mode, setMode] = useState<{ mode: boolean }>({
        mode: true,
    });

    const [tagsData, setTagsData] = useState<TagType[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tagsList = await getTags();
                setTagsData(tagsList);
            } catch (error) {
                console.error("Error fetching getTags:", error);
            }
        };
        fetchTags();
    }, []);

    const handleSubmit = async (vals: ToDoFormValues) => {
        try {
            vals.priority = value;
            // @ts-ignore
            vals.tags = selectedTags.map(tagId => ({ id: parseInt(tagId) }));

            await createTodo(vals);
            setNotification({
                message: 'Task created successfully!',
                type: 'success',
                show: true,
            });

            setMode({
                mode: false,
            });

            setTimeout(() => {
                setNotification((prev) => ({ ...prev, show: false }));
                if (!vals.done){
                    navigate('/todo')
                } else {
                    navigate('/history')
                }

            }, 3000);
        } catch (e) {
            console.error(e);
            setNotification({
                message: 'Something went wrong while saving your task.',
                type: 'error',
                show: true,
            });

            setTimeout(() => {
                setNotification((prev) => ({ ...prev, show: false }));
            }, 3000);
        }
    }

    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', minWidth: "255px"}}>
            <Paper shadow="xl" radius="xl" p="xl" w={800} h={570} style={{backgroundColor: "#eaeaea"}}>
                <form onSubmit={form.onSubmit(handleSubmit)} style={{paddingTop: "90px"}}>
                    <Stack
                        h={300}
                        bg="#eaeaea"
                        align="stretch"
                        justify="center"
                        gap="lg"
                    >
                        <TextInput
                            radius="xl"
                            label="Title"
                            withAsterisk
                            placeholder="Task title"
                            {...form.getInputProps('title')}
                        />

                        <Textarea
                            radius="lg"
                            label="Description"
                            withAsterisk
                            placeholder="Enter description"
                            {...form.getInputProps('description')}
                        />

                        <Checkbox
                            defaultChecked
                            label="Done"
                            color="teal"
                            {...form.getInputProps('done', {type: 'checkbox'})}
                        />

                        <Text fw={500} style={{paddingTop: "20px"}}>
                            Select priority
                        </Text>
                        <Rating value={value} count={3} onChange={setValue} />

                        <MultiSelect
                            label="Tag your task"
                            placeholder="Pick value"
                            data={tagsData.map(tag => ({ value: tag.id.toString(), label: tag.name }))}
                            value={selectedTags}
                            onChange={setSelectedTags}
                        />

                        <Group justify="center" style={{paddingTop: "20px"}}>
                            {mode.mode && <Button variant="filled" type="submit">Save</Button>}
                        </Group>
                    </Stack>
                </form>

                {notification.show && (
                    <Notification
                        icon={notification.type === 'error' ? <IconX size={20} /> : <IconCheck size={20} />}
                        color={notification.type === 'error' ? 'red' : 'teal'}
                        title={notification.type === 'error' ? 'Oops!' : 'Success!'}
                        mt="md"
                    >
                        {notification.message}
                    </Notification>
                )}

            </Paper>
        </div>
    )
}