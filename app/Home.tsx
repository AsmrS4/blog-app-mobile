import { fetchPosts } from '@/api'
import Header from '@/components/Header'
import PostCard from '@/components/PostCard'
import PostProps from '@/types/Post'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

const Home = () => {
	const [posts, setPosts] = useState<PostProps[]>([])
	const handleFetchPosts = async () => {
		const fetchedPosts = await fetchPosts()
		setPosts(fetchedPosts)
	}
	useEffect(() => {
		handleFetchPosts()
	}, [])

	return (
		<View style={styles.container}>
			<Header />
			<FlatList
				data={posts}
				renderItem={({ item }) => <PostCard {...item} />}
				keyExtractor={item => item.id.toString()}
				contentContainerStyle={{
					paddingVertical: 16,
					zIndex: 1
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default Home
