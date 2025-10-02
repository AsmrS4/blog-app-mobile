import api from '@/api'
import { PostProps } from '@/types/Post'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useNavigation } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const PostCard = (item: PostProps) => {
	const [hasLike, setHasLike] = React.useState<boolean>(false)
	const [likes, setLikes] = React.useState<number>(0)
	const navigation = useNavigation()
	const handlePress = async () => {
		if (hasLike) {
			await handleRemoveLike()
		} else {
			await handleSetLike()
		}
	}
	const handleSetLike = async () => {
		try {
			const response = await api.setLike(item.id)
			setHasLike(true)
			setLikes(prev => ++prev)
		} catch (error) {
			navigation.navigate('Login')
		}
	}
	const handleRemoveLike = async () => {
		try {
			const response = await api.removeLike(item.id)
			setHasLike(false)
			setLikes(prev => --prev)
		} catch (error) {
			navigation.navigate('Login')
		}
	}
	const handleFetchCount = async () => {
		try {
			const response = await api.fetchPostLikesCount(item.id)
			console.log(response)
			setHasLike(await response.hasLike)
			setLikes(await response.count)
		} catch (error) {
			navigation.navigate('Login')
		}
	}
	React.useEffect(() => {
		handleFetchCount()
	}, [])
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
					<View>
						<TouchableOpacity
							style={styles.likes}
							onPress={handlePress}
						>
							{hasLike ? (
								<HeartFilled style={{ color: 'red' }} />
							) : (
								<HeartOutlined />
							)}
							{likes}
						</TouchableOpacity>
					</View>
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
	},
	likes: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '4px'
	}
})

export default PostCard
