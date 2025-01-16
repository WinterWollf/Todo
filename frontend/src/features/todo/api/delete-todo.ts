import ky from 'ky';
import {API_URL} from "../../../config";
import {ToDoFormValues} from "../../../types/ToDoFormValues.ts";

export const deleteTodo = async (data: ToDoFormValues) => {
    return ky.delete(`${API_URL}/todo/${data.id}`, {credentials: "include"});
}