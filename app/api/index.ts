import axios from 'axios'

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