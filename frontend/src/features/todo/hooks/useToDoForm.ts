import {useForm} from "@mantine/form";
import {ToDoFormValues} from "../../../types/ToDoFormValues";

export const useToDoForm = () => {
    const form = useForm<ToDoFormValues>({
        mode: 'uncontrolled',
        initialValues: {
            description: '',
            title: '',
            done: false,
            priority: 1,
            tags: [],
        },

        validate: {
            title: (value) => {
                if (value.length < 5) {
                    return 'Title is too short';
                }
            },
            description: (value) => {
                if (value.length < 10) {
                    return 'Content is too short';
                }
            },
        },
    });

    return form;
}