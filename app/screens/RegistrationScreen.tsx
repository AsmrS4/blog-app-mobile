import { registerUser } from '@/api'
import { registerSchema, RegisterSchema } from '@/form.config'
import { RegisterProps } from '@/types/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Button, View } from 'react-native'
import InputField from '../components/InputField'

const RegisterScreen = ({ navigation }: any) => {
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema)
	})

	const onSubmit = async (data: RegisterProps) => {
		try {
			await registerUser(data)
			Alert.alert(
				'Регистрация успешна!',
				'Вы успешно зарегистрировались!'
			)
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
						label='Имя'
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
						secureTextEntry
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
				rules={{
					required: true
				}}
			/>
			<Button
				title='Зарегистрироваться'
				onPress={handleSubmit(onSubmit)}
			/>
		</View>
	)
}

export default RegisterScreen
