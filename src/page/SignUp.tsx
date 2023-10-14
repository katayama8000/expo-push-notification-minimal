import React, { FC, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Touchable } from 'react-native';
import { auth } from '../lib/FBConfig';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { TouchableButton } from '../component/TouchableButton';

export const SignUpScreen: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignup = async () => {
    try {
      if (email === '' || password === '') {
        console.log('empty');
        return;
      }
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  // tattu.0310@gmail.com
  // 109609Akg

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableButton label="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // 背景色を設定
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff', // フォームの背景色を設定
    fontSize: 16, // フォントサイズを調整
    borderRadius: 5, // 角丸にする
  },
  button: {
    backgroundColor: '#3498db', // ボタンの背景色を設定
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff', // ボタンのテキスト色を設定
    fontSize: 18,
  },
});
