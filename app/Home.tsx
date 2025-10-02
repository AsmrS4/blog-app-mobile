import api from '@/api'
import Header from '@/components/Header'
import { PostProps } from '@/types/Post'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import PostCard from './components/PostCard'
const Home = () => {
	const [posts, setPosts] = useState<PostProps[]>([])
	const handleFetchPosts = async () => {
		try {
			const fetchedPosts = await api.fetchPosts()
			setPosts(fetchedPosts)
		} catch (error) {
			setPosts([])
		}
	}
	useEffect(() => {
		handleFetchPosts()
	}, [])

	return (
		<View style={styles.container}>
			<Header />
			<ScrollView style={styles.list}>
				{posts.map(item => (
					<PostCard key={item.id} {...item} />
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	list: {
		height: 400,
		overflow: 'scroll'
	}
})

export default Home
