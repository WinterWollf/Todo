import {FC, memo, useEffect, useState} from 'react';
import {ToDoType} from "../../types/ToDoType";
import {
    ActionIcon, Badge,
    Button,
    Card,
    Checkbox,
    Group,
    Image,
    Menu,
    Modal,
    MultiSelect,
    Notification,
    Rating,
    Stack,
    Text,
    Textarea,
    TextInput
} from "@mantine/core";
import {IconCheck, IconEdit, IconSettings, IconTrash, IconX} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";
import {useToDoForm} from "./hooks/useToDoForm.ts";
import {ToDoFormValues} from "../../types/ToDoFormValues.ts";
import {editTodo} from "./api/edit-todo.ts";
import {modals} from '@mantine/modals';
import {deleteTodo} from "./api/delete-todo.ts";
import {getTags} from "../tags/api/get-tags.ts";

interface ToDoListItemProps {
    item: ToDoType;
}

export const ToDoListItem: FC<ToDoListItemProps> = memo(({item}) => {
    const style = item.done ? {border: '3px solid', borderColor: "rgba(255,0,0,0.99)"} : undefined;

    const navigate = useNavigate();
    const form = useToDoForm();

    const [StarValue, setValue] = useState(1);
    const [opened, { open, close }] = useDisclosure(false);
    const [tagsData, setTagsData] = useState<{ id: number; name: string }[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tagsWithNames, setTagsWithNames] = useState(item.tags);

    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | null, show: boolean }>({
        message: '',
        type: null,
        show: false,
    });

    const [mode, setMode] = useState<{ mode: boolean }>({
        mode: true,
    });

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
            vals.priority = StarValue;
            // @ts-ignore
            vals.tags = selectedTags.map(tagId => ({ id: parseInt(tagId) }));

            await editTodo(vals);
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
                navigate('/'); ////////
                close();
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

    const handleEditClick = () => {
        form.setValues({
            title: item.title,
            description: item.description,
            done: item.done,
            priority: item.priority,
            id: item.id,
        });

        setValue(item.priority);

        if (item.tags && Array.isArray(item.tags)) {
            const tagIds = item.tags.map((tag) => tag.tagId.toString());
            setSelectedTags(tagIds);
        }

        open();
    };

    const handleDeleteClick = async () => {
        try {
            await deleteTodo(item);
            navigate('/'); ////////
        } catch (e) {
            console.error(e);
        }
    };

    const getImageSrc = () => {
        switch (item.priority) {
            case 1:
                return "src/assets/exclamation1.png";
            case 2:
                return "src/assets/exclamation2.png";
            case 3:
                return "src/assets/exclamation3.png";
        }
    };

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tagsList = await getTags();
                const tagsMap = new Map(tagsList.map(tag => [tag.id, tag.name]));

                // Dodaj nazwy tagów do `item.tags`
                const updatedTags = item.tags.map((tag) => ({
                    ...tag,
                    name: tagsMap.get(tag.tagId) || "Unknown",
                }));

                setTagsWithNames(updatedTags);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();
    }, [item.tags]);

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: 'Delete task',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete your task? This action is irreversible.
                </Text>
            ),
            labels: { confirm: 'Delete task', cancel: "No don't delete it" },
            confirmProps: { color: 'red' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => handleDeleteClick(),
        });

    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={style}>
                <Card.Section>
                    <Image
                        src={getImageSrc()}
                        height={200}
                    />
                </Card.Section>

                <Text fw={500} size="lg" mt="md">
                    {item.title}
                </Text>

                <Text mt="xs" c="dimmed" size="sm">
                    {item.description}
                </Text>
                <div style={{display: 'flex'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'left',
                        flexWrap: 'wrap',
                        gap: '5px',
                        marginTop: '20px',
                        width: "300px",
                    }}>
                        {tagsWithNames.map((tag) => (
                            <Badge key={tag.tagId} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>
                                {tag.name}
                            </Badge>
                        ))}
                    </div>

                    <div style={{display: 'flex', justifyContent: 'right', paddingTop: "10px"}}>
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <ActionIcon variant="light" color="teal" size="2.2rem" radius="md" aria-label="Settings">
                                    <IconSettings id="settings-button" style={{width: '70%', height: '70%'}} stroke={1.5}/>
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Label>Danger zone</Menu.Label>
                                <Menu.Item onClick={handleEditClick} leftSection={<IconEdit size={14}/>}>
                                    Edit task
                                </Menu.Item>
                                <Menu.Item id="delete-warning" onClick={openDeleteModal} color="red" leftSection={<IconTrash size={14}/>}>
                                    Delete task
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                </div>
            </Card>

            <Modal opened={opened} onClose={close} size="lg" h="1000px" title="Edit task">
                <form onSubmit={form.onSubmit(handleSubmit)} style={{paddingTop: "50px", paddingBottom: "90px"}}>
                    <Stack
                        h={300}
                        bg="white"
                        align="stretch"
                        justify="center"
                        gap="lg"
                    >
                        <TextInput
                            id="title-input"
                            radius="xl"
                            label="Title"
                            withAsterisk
                            placeholder="Task title"
                            {...form.getInputProps('title')}
                        />

                        <Textarea
                            id="description-input"
                            radius="lg"
                            label="Description"
                            withAsterisk
                            placeholder="Enter description"
                            {...form.getInputProps('description')}
                        />

                        <Checkbox
                            style={{paddingTop: "8px"}}
                            defaultChecked
                            label="Done"
                            color="teal"
                            {...form.getInputProps('done', {type: 'checkbox'})}
                        />

                        <Text fw={500} style={{paddingTop: "20px"}}>
                            Select priority
                        </Text>
                        <Rating id="rating-button-edit" value={StarValue} count={3} onChange={setValue} />

                        <MultiSelect
                            label="Tag your task"
                            placeholder="Pick value"
                            data={tagsData.map(tag => ({ value: tag.id.toString(), label: tag.name }))}
                            value={selectedTags}
                            onChange={setSelectedTags}
                        />

                        <Group justify="center">
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
            </Modal>
        </>
    );
});