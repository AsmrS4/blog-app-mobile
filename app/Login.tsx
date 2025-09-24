import api from '@/api'
import InputField from '@/components/InputField'
import authSchema, { AuthSchema } from '@/form.config'
import AuthProps from '@/types/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Button, View } from 'react-native'

const Login = () => {
	const navigation = useNavigation()
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<AuthSchema>({
		resolver: zodResolver(authSchema)
	})

	const onSubmit = async (data: AuthProps) => {
		try {
			const result = await api.loginUser(data)
			console.log(result)
			if (result) {
				//navigation.navigate('Home')
			}
		} catch (error) {
			Alert.alert('Ошибка', 'Что-то пошло не так. Попробуйте позже.')
		}
	}

	return (
		<View>
			<Controller
				control={control}
				render={({ field: { onChange, value } }) => (
					<InputField
						label='Введите логин'
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
						label='Введите пароль'
						secureTextEntry={true}
						value={value}
						onChangeText={onChange}
						error={errors?.password && errors.password.message}
					/>
				)}
				name='password'
			/>
			<Button title='Войти' onPress={handleSubmit(onSubmit)} />
		</View>
	)
}

export default Login
