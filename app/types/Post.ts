import { UserProps } from "./User";

export type PostProps = {
    id: string;
    title: string;
    text: string;
    image?: string | null;
    author: UserProps;
    createTime: string;
    modifiedTime?: string | null; 
}