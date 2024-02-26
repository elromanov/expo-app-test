import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'
import { Link, Stack } from 'expo-router'
import React from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Sign up'}}/>

      <Text style={styles.label}>Email</Text>
      <TextInput placeholder="jon@gmail.com" style={styles.input}/>

      <Text style={styles.label}>Password</Text>
      <TextInput placeholder="Password" style={styles.input} secureTextEntry/>

      <Button text="Sign in"/>
      <Link href="/(auth)/sign-in" style={styles.textButton}>
        <Text style={styles.createAccountText}>Sign in</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  label: {
    fontSize: 16,
    color: 'gray'
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 20
  },
  createAccountText: {
    textAlign: 'center',
    marginTop: 10,
    color: Colors.light.tint,
    fontWeight: 'bold'
  },
  textButton: {
    alignSelf: 'center',
    color: Colors.light.tint,
    fontWeight: 'bold',
  }
});

export default SignUpScreen;