import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'
import { supabase } from '@/src/lib/supabase'
import { Link, Stack } from 'expo-router'
import React, { useState } from 'react'
import { Text, TextInput, View, StyleSheet, Alert } from 'react-native'

const SignInScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail(){
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({email, password});

    if(error) Alert.alert(error.message);
    setLoading(false);
  }

  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Sign in'}}/>

      <Text style={styles.label}>Email</Text>
      <TextInput placeholder="jon@gmail.com" style={styles.input} value={email} onChangeText={setEmail}/>

      <Text style={styles.label}>Password</Text>
      <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry/>

      <Button onPress={signInWithEmail} disabled={loading} text={loading ? "Signing in..." : "Sign in"}/>
      <Link href="/(auth)/sign-up" style={styles.textButton}>
        <Text style={styles.createAccountText}>Sign up</Text>
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
    flex: 1,
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

export default SignInScreen;