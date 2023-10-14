import React, { FC, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { auth } from '../lib/FBConfig';
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../App';
import { TouchableButton } from '../component/TouchableButton';

export const SignInScreen: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NavigationProp>();

  const handleSignIn = async () => {
    try {
      if (email === '' || password === '') {
        console.log('empty');
        return;
      }
      const user: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user);
      navigation.navigate('AllTry');
    } catch (error) {
      console.error('Error signing in:', error);
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
      <TouchableButton
        label="Sign In"
        backgroundColor="#339966"
        onPress={handleSignIn}
      />
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
    backgroundColor: '#ffffff',
    fontSize: 16,
    borderRadius: 20, // 丸みを持たせる
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20, // 丸みを持たせる
  },
  buttonText: {
    color: 'red', // ボタンのテキスト色を設定
    fontSize: 40,
  },
});
