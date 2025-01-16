import ky from 'ky';
import {ToDoType} from "../../../types/ToDoType.ts";
import {API_URL} from "../../../config";

export const getTodos = async (queryParams: string = '') => {
    return ky.get(`${API_URL}/todo${queryParams}`, {credentials: "include"}).json<ToDoType[]>();
};
