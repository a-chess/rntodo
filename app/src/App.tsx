import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Config from 'react-native-config'
import functions, { firebase } from '@react-native-firebase/functions'

functions().useFunctionsEmulator('http://localhost:5001')

const Tab = createBottomTabNavigator()
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>{`ENV: ${Config.ENVIRONMENT}`}</Text>
    </View>
  )
}

function TestScreen() {
  const makeDocument = async () => {
    // ■ Success
    // const func = functions().httpsCallable('addMessage')
    // func({ text: 'testtesttest' })
    //   .then((response) => {
    //     console.log('success')
    //     console.log(response)
    //   })
    //   .catch((error) => {
    //     console.log('error')
    //     console.log(error)
    //   })

    const func = functions().httpsCallable('addMessage')
    const result = await func({ text: 'test2test2test2' })
    console.log(result)
  }

  return (
    <View style={styles.container}>
      <Text>Test Screen</Text>
      <Button title="create" onPress={makeDocument} />
    </View>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Test"
          component={TestScreen}
          options={{
            tabBarLabel: 'Test',
            tabBarBadge: 3,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
