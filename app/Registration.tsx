import api from '@/api'
import { registerSchema, RegisterSchema } from '@/form.config'
import { RegisterProps } from '@/types/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import InputField from './components/InputField'

const RegisterScreen = () => {
	const navigation = useNavigation()
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema)
	})

	const onSubmit = async (data: RegisterProps) => {
		try {
			await api.registerUser(data)
			Alert.alert(
				'Регистрация успешна!',
				'Вы успешно зарегистрировались!'
			)
			navigation.navigate('Home')
		} catch (error) {
			return Alert.alert(
				'Ошибка',
				'Что-то пошло не так. Попробуйте позже.',

				[{ text: 'OK', onPress: () => console.log('OK Pressed') }],
				{ cancelable: true }
			)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 32, fontWeight: 600 }}>Регистрация</Text>
			<View style={styles.form}>
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
						<InputField
							label='Придумайте логин'
							value={value}
							onChangeText={onChange}
							error={errors?.username && errors.username.message}
						/>
					)}
					name='username'
				/>
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
						<InputField
							label='Придумайте пароль'
							secureTextEntry
							value={value}
							onChangeText={onChange}
							error={errors?.password && errors.password.message}
						/>
					)}
					name='password'
				/>
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
						<InputField
							label='Повторите пароль'
							secureTextEntry
							value={value}
							onChangeText={onChange}
							error={
								errors?.confirmPassword &&
								errors.confirmPassword.message
							}
						/>
					)}
					name='confirmPassword'
				/>
				<Button
					title='Войти в аккаунт'
					onPress={() => {
						navigation.navigate('Login')
					}}
				/>
				<Button
					title='Зарегистрироваться'
					onPress={handleSubmit(onSubmit)}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: 10,
		paddingTop: 60,
		gap: 40
	},
	form: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',

		gap: 10
	},
	button: {
		width: '100%',
		borderRadius: 8
	}
})

export default RegisterScreen
