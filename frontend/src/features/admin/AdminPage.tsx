import { FC, useState, useEffect } from 'react';
import { Select, Button, TextInput, Group, Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { getUsers } from './api/get-users';
import { updatePassword } from './api/update-password';

interface User {
    id: number;
    email: string;
}

export const AdminPage: FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState<string>('');
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error' | null;
        show: boolean;
    }>({
        message: '',
        type: null,
        show: false,
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers();
                // @ts-ignore
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handlePasswordChange = async () => {
        if (!selectedUser || !newPassword) {
            setNotification({
                message: 'Please select a user and enter a new password.',
                type: 'error',
                show: true,
            });
            return;
        }

        try {
            await updatePassword(newPassword);
            setNotification({
                message: 'Password updated successfully!',
                type: 'success',
                show: true,
            });
        } catch (error) {
            setNotification({
                message: 'Error updating password.',
                type: 'error',
                show: true,
            });
        }

        setSelectedUser(null);
        setNewPassword('');
    };

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', minWidth: '255px' }}>
            <div
                style={{
                    background: 'lightgray',
                    width: '100%',
                    maxWidth: '500px',
                    height: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: '5%',
                    padding: '20px',
                }}
            >
                <Select
                    label="Select User"
                    placeholder="Choose a user"
                    value={selectedUser}
                    onChange={setSelectedUser}
                    data={users.map((user) => ({ value: user.email, label: user.email }))}
                    style={{ marginBottom: '20px', marginTop: '30px' }}
                />
                <TextInput
                    label="New Password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    style={{ marginBottom: '60px', marginTop: '40px' }}
                />
                <Group>
                    <Button onClick={handlePasswordChange}>Change Password</Button>
                </Group>

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
            </div>
        </div>
    );
};
