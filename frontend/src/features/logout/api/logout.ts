import ky from 'ky';
import {ToDoType} from "../../../types/ToDoType";
import {API_URL} from "../../../config";

export const logOut = async () => {
    return ky.post(`${API_URL}/auth/logout`, {credentials: "include"}).json<ToDoType>();
}