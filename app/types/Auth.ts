import { UserProps } from "./User";

export interface AuthProps {
    username: string;
    password: string;
}

export interface RegisterProps {
    username: string;
    password: string;
    confirmPassword: string;
}

export interface SessionResponse {
    accessResponse: AccessToken;
    profile: UserProps
}

export interface AccessToken {
    accessToken: string
}