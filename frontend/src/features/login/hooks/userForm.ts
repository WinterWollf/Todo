import {useForm} from "@mantine/form";
import {UserType} from "../../../types/UserType.ts";

export const useUserForm = () => {
    const form = useForm<UserType>({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
        },
    });

    return form;
}
