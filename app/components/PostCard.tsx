import { PostProps } from '@/types/Post'
import { HeartFilled } from '@ant-design/icons'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
const PostCard = (item: PostProps) => {
	return (
		<View style={styles.card}>
			<View style={styles.headerWrapper}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.author}>{item.author.username}</Text>
			</View>
			{item.image ? (
				<Image
					source={{ uri: item.image }}
					style={[styles.image, { height: 200 }]}
					resizeMode='cover'
				/>
			) : null}
			<View style={styles.content}>
				<Text style={styles.text}>{item.text}</Text>
				<View style={styles.footerWrapper}>
					<HeartFilled style={{ color: 'red' }} />
					<Text style={styles.time}>{item.createTime}</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	headerWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10
	},
	title: {
		fontWeight: 'bold',
		fontSize: 16
	},
	author: {},
	image: {
		width: '100%',
		marginTop: 10
	},
	content: {
		marginTop: 10
	},
	text: {
		fontSize: 14,
		padding: 10
	},
	time: {
		color: '#888',
		fontSize: 12,
		padding: 10
	},
	footerWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10
	}
})

export default PostCard
