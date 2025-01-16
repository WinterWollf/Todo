import ky from 'ky';
import { API_URL } from "../../../config";
import {UserProfile} from "../types/UserProfile.ts";


export const getUserProfile = async () => {
    return ky.get(`${API_URL}/user/me`, { credentials: "include" }).json<UserProfile>();
}
