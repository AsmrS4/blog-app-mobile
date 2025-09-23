import { UserProps } from "./User";

type PostProps = {
    id: string;
    title: string;
    text: string;
    image?: string | null;
    author: UserProps;
    createTime: string;
    modifiedTime?: string | null; 
}

export default PostProps