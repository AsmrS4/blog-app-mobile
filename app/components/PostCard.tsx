import { PostProps } from '@/types/Post'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const PostCard = (props: PostProps) => {
	return (
		<View style={styles.card}>
			<View style={styles.headerWrapper}>
				<Text>{props.title}</Text>
				<Text>{props.author.username}</Text>
			</View>
			{props.image && (
				<View style={styles.imageContainer}>
					<Image
						source={{ uri: props.image?.toString() }}
						style={{ width: '100%', height: '100%' }}
						resizeMode='cover'
					/>
				</View>
			)}
			<View style={styles.content}>
				<Text>{props.text}</Text>
				<Text>{props.createTime}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginBottom: 10,
		borderRadius: 8,
		borderWidth: 1
	},
	headerWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10
	},
	imageContainer: {
		width: '100%',
		minHeight: 200,
		overflow: 'hidden'
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		padding: 10
	}
})
export default PostCard
