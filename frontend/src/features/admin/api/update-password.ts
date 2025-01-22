import ky from 'ky';
import { API_URL } from "../../../config";

interface UpdatePasswordDTO {
    newPassword: string;
}

export const updatePassword = async (newPassword: string) => {
    const payload: UpdatePasswordDTO = { newPassword };

    try {
        const response = await ky.put(`${API_URL}/user/password`, {
            json: payload,
            credentials: 'include',
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating password:', error);
        throw new Error('Could not update password');
    }
};
