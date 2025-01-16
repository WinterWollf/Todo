import {FC, useEffect, useState} from 'react';
import {Button, Group, Image, Modal, Notification, PasswordInput, Stack, Text, TextInput} from '@mantine/core';
import {loginErrorNotification} from "./notifications";
import {useNavigate} from "react-router-dom";
import {login} from "./api/login";
import {IconCheck, IconX} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {register} from "./api/register.ts";
import {useUserForm} from "./hooks/userForm.ts";
import {UserType} from "../../types/UserType.ts";

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);

    const form = useUserForm();
    const formRegister = useUserForm();

    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | null, show: boolean }>({
        message: '',
        type: null,
        show: false,
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const [mode, setMode] = useState<{ mode: boolean }>({
        mode: true,
    });

    const handleSubmit = async (user: UserType) => {
        try {
            await login(user.email, user.password);
            navigate('/todo');
        } catch (e) {
            loginErrorNotification();
            console.error(e);
        }
    }

    const handleRegisterSubmit = async (user: UserType) => {
        try {
            await register(user.email, user.password);
            setNotification({
                message: 'Registration successful',
                type: 'success',
                show: true,
            });

            setMode({
                mode: false,
            });

            setTimeout(() => {
                setNotification((prev) => ({ ...prev, show: false }));
                close();

                formRegister.reset()

                setMode({
                    mode: true,
                });
            }, 3000);
        } catch (e) {
            console.error(e);
            if (e instanceof Error) {
                const formattedMessage = e.message
                    .split(',')
                    .map((msg: string) => msg.trim())
                    .map((msg: string) => msg.charAt(0).toUpperCase() + msg.slice(1))
                    .join('\n');

                setNotification({
                    message: formattedMessage,
                    type: 'error',
                    show: true,
                });
            } else {
                setNotification({
                    message: 'An unknown error occurred.',
                    type: 'error',
                    show: true,
                });
            }

            setTimeout(() => {
                setNotification((prev) => ({ ...prev, show: false }));
            }, 3000);
        }
    }

    const handleRegister = () => {
        open();
    }

    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', minWidth: "255px"}}>
            <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '80px', marginBottom: "60px"}}>
                    <Text size="50px" fw={100} variant="gradient" gradient={{from: '#006A3C', to: '#A71A30', deg: 0}}>
                        Welcome to AGH ToDo
                    </Text>
                </div>
                <div style={{background: "lightgray", width: "100%", maxWidth: "500px", height: "600px", marginLeft: "auto", marginRight: "auto", borderRadius: "5%"}}>
                    <div style={{display: 'flex', justifyContent: 'center', paddingTop: "20px"}}>
                        <Image radius="md" src="src/assets/AGH_Logo.png" h="auto" w="auto"/>
                    </div>
                    <Stack h={300} align="center" justify="center" gap="lg">
                        <TextInput required type="email" label="Email" {...form.getInputProps('email')} />
                        <TextInput required type="password" label="Password" {...form.getInputProps('password')} />
                        <Button variant="gradient" gradient={{from: '#006A3C', to: '#A71A30', deg: 0}} fw={500} w={150}
                                size="lg" radius="xl" type="submit">Login</Button>
                    </Stack>
                    <div style={{ textAlign: 'right', padding: "50px 0px" }}>
                        <Button variant="transparent" color="white" radius="xl" size="lg" fw={500} onClick={handleRegister}>Register</Button>
                    </div>
                </div>
            </form>

            <Modal opened={opened} onClose={close} size="lg" h="1000px" title="Register form" >
                <form onSubmit={formRegister.onSubmit(handleRegisterSubmit)} style={{}}>
                    <Stack
                        h={300}
                        bg="white"
                        align="stretch"
                        justify="center"
                        gap="lg"
                    >
                        <TextInput
                            required
                            radius="xl"
                            label="Email"
                            withAsterisk
                            placeholder="Enter email"
                            {...formRegister.getInputProps('email')}
                        />

                        <PasswordInput
                            required
                            radius="lg"
                            label="Password"
                            withAsterisk
                            placeholder="Enter password"
                            {...formRegister.getInputProps('password')}
                        />

                        <Group justify="center">
                            {mode.mode && <Button variant="filled" type="submit">Register</Button>}
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
        </div>
    );
};