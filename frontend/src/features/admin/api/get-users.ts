import ky from 'ky';
import {API_URL} from "../../../config";
import { UserType } from "../../../types/UserType";

export const getUsers = async () => {
    return ky.get(`${API_URL}/user/users`, {credentials: "include"}).json<UserType[]>();
}