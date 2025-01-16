import {showNotification} from "@mantine/notifications";

export const loginErrorNotification = () => {
    showNotification(
        {
            color: 'red',
            title: 'Login failed',
            message: 'Please check your credentials and try again',
        })
}