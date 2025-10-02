import AuthProps, { RegisterProps, SessionResponse } from '@/types/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = {
    
    fetchPosts: async() => {
        const token = await AsyncStorage.getItem("ACCESS_TOKEN")
        try {
            const response = await axios({
                url: 'http://localhost:8800/api/v1/posts',
                method: 'GET'
            })
            return await response.data
        } catch (error) {
        
        }
    },
    fetchPostLikesCount: async(postId: string) => {
        const token = await AsyncStorage.getItem("ACCESS_TOKEN")
        try {
            const response = await axios({
                url: 'http://localhost:8800/api/v1/posts/count/' + postId,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            return await response.data
        } catch (error) {
            throw error
        }
    },
    setLike: async(postId: string) => {
        const token = await AsyncStorage.getItem("ACCESS_TOKEN")
        try {
            const response = await axios({
                url: 'http://localhost:8800/api/v1/posts/like/' + postId,
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            return await response.data
        } catch (error) {
            throw error
        }
    },
    removeLike: async(postId: string) => {
        const token = await AsyncStorage.getItem("ACCESS_TOKEN")
        try {
            const response = await axios({
                url: 'http://localhost:8800/api/v1/posts/like/' + postId,
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            return await response.data
        } catch (error) {
            throw error
        }
    },
    loginUser: async(data: AuthProps) => {
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
    },
    registerUser: async(data: RegisterProps) => {
        try {
            const response = await axios( {
                url: 'http://localhost:8800/api/v1/auth/sign-up',
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
    },
    logoutUser: async() => {
        const token = await AsyncStorage.getItem("ACCESS_TOKEN")
        try {
            await axios( {
                url: 'http://localhost:8800/api/v1/auth/logout',
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
        } catch (error) {
            
        }
    }
}


export default api;




 