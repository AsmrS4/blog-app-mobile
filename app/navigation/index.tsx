import Home from '@/Home'
import Login from '@/Login'
import Register from '@/Registration'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

const Stack = createStackNavigator()

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Login'>
				<Stack.Screen
					name='Login'
					component={Login}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Register'
					component={Register}
					options={{ title: 'Регистрация' }}
				/>
				<Stack.Screen
					name='Home'
					component={Home}
					options={{ title: 'Домашняя страница' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default AppNavigator
