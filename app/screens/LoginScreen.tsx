import { loginUser } from '@/api'
import InputField from '@/components/InputField'
import { authSchema, AuthSchema } from '@/form.config'
import { AuthProps } from '@/types/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Button, View } from 'react-native'

const LoginScreen = ({ navigation }: any) => {
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<AuthSchema>({
		resolver: zodResolver(authSchema)
	})

	const onSubmit = async (data: AuthProps) => {
		try {
			const result = await loginUser(data)
			navigation.navigate('Home')
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
						label='Логин'
						value={value}
						onChangeText={onChange}
						error={errors?.username && errors.username.message}
					/>
				)}
				name='username'
				rules={{
					required: true
				}}
			/>
			<Controller
				control={control}
				render={({ field: { onChange, value } }) => (
					<InputField
						label='Пароль'
						secureTextEntry={true}
						value={value}
						onChangeText={onChange}
						error={errors?.password && errors.password.message}
					/>
				)}
				name='password'
				rules={{
					required: true
				}}
			/>
			<Button title='Войти' onPress={handleSubmit(onSubmit)} />
		</View>
	)
}

export default LoginScreen
