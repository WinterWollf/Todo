import ky from 'ky';
import {ToDoType} from "../../../types/ToDoType";
import {API_URL} from "../../../config";
import {ToDoFormValues} from "../../../types/ToDoFormValues";

export const editTodo = async (data: ToDoFormValues) => {
    return ky.put(`${API_URL}/todo/${data.id}`, { json: data, credentials: "include" }).json<ToDoType>();
}
