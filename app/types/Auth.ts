import { UserProps } from "./User";

type AuthProps = {
    username: string;
    password: string;
}

export default AuthProps

export type RegisterProps = {
    username: string;
    password: string;
    confirmPassword: string;
}

export type SessionResponse ={
    accessResponse: AccessToken;
    profile: UserProps
}

export type AccessToken ={
    accessToken: string
}
