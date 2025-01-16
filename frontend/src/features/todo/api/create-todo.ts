import ky from 'ky';
import {ToDoType} from "../../../types/ToDoType";
import {API_URL} from "../../../config";
import {ToDoFormValues} from "../../../types/ToDoFormValues";

export const createTodo = async (data: ToDoFormValues) => {
    return ky.post(`${API_URL}/todo`, {json: data, credentials: "include"}).json<ToDoType>();
}