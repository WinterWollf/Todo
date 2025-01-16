import ky from 'ky';
import {API_URL} from "../../../config";
import {TagType} from "../../../types/TagType.ts";

export const getTags = async () => {
    return ky.get(`${API_URL}/tags`, {credentials: "include"}).json<TagType[]>();
}