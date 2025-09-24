import { AuthProps, RegisterProps, SessionResponse } from '@/types/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const fetchPosts = async() => {
    try {
        const response = await axios({
            url: 'http://localhost:8800/api/v1/posts',
            method: 'GET'
        })
        return await response.data
    } catch (error) {
        
    }
}

export const fetchPostLikesCount = async(postId: string) => {
    try {
        const response = await axios({
            url: 'http://localhost:8800/api/v1/posts/count/' + postId,
            method: 'GET'
        })
        return await response.data
    } catch (error) {
        
    }
} 


export const loginUser = async(data: AuthProps) => {
    try {
        const response = await axios( {
            url: 'http://localhost:8800/api/v1/auth/sign-in',
            method: 'POST',
            data: {
                ...data
            }
        })
        const session: SessionResponse = await response.data;
        await AsyncStorage.setItem("ACCESS_TOKEN", session.accessResponse.accessToken);
        await AsyncStorage.setItem("USERNAME", session.profile.username);
        return true
    } catch (error) {
        throw error
    }
}

export const registerUser = async(data: RegisterProps) => {
    try {
        const response = await axios( {
            url: 'http://localhost:8800/api/v1/auth/sign-in',
            method: 'POST',
            data: {
                ...data
            }
        })
        const session: SessionResponse = await response.data;
        await AsyncStorage.setItem("ACCESS_TOKEN", session.accessResponse.accessToken);
        await AsyncStorage.setItem("USERNAME", session.profile.username);
        return true
    } catch (error) {
        throw error
    }
}