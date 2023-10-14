// screens/GoalInputScreen.tsx

import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { FC, useState } from 'react';
import Toast from 'react-native-toast-message';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import { auth, db } from '../lib/FBConfig';
import dayjs from 'dayjs';
import { goalConverter } from '../module/converter/GoalConverter';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../App';

export const NewTryScreen: FC = () => {
  const [goalName, setGoalName] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const handleSaveGoal = async () => {
    try {
      const user = auth.currentUser;
      if (!goalName.trim()) {
        return; // 空の目標名は保存しない
      }

      // 目標を保存する
      const goalData = {
        goalName: goalName,
        createdAt: dayjs().toDate(),
        completed: false,
        completionDate: dayjs().add(30, 'day').toDate(),
        feelingAfterCompletion: '',
      };

      console.log({ goalData });

      if (!user) return;

      const goalColleltionRef = collection(
        db,
        'goals',
        user.uid,
        'goals'
      ).withConverter(goalConverter);

      const newGoalDoc = await addDoc(goalColleltionRef, goalData);

      // アクティブな目標がない場合のみアクティブな目標を設定
      const activeGoalRef = doc(db, 'goals', user.uid);
      const activeGoalDoc = await getDoc(activeGoalRef);
      if (!activeGoalDoc.exists()) {
        await setDoc(activeGoalRef, { activeGoal: newGoalDoc.id });
      }

      console.log('目標を保存:', newGoalDoc.id);
      setGoalName(''); // 目標名をリセット

      const dailyEntriesRef = collection(
        db,
        'goals',
        user.uid,
        'goals',
        newGoalDoc.id,
        'dailyEntries'
      );
      const dailyEntryData = {
        // feeling,
        completed: false,
      };

      await setDoc(
        doc(dailyEntriesRef, dayjs().format('MM-DD-YYYY')),
        dailyEntryData
      );

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'good',
      });

      navigation.navigate('TryingDetail');
    } catch (error) {
      console.error('目標の保存に失敗しました:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Somthing wrong',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>30日間の目標を入力</Text>
      <TextInput
        placeholder="目標を入力してください"
        value={goalName}
        onChangeText={(text) => setGoalName(text)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveGoal}>
        <Text style={styles.buttonText}>保存</Text>
      </TouchableOpacity>
      <Toast />
      <Button
        title="toast"
        onPress={() => {
          Toast.show({
            type: 'error',
            text1: 'Hello',
            text2: 'This is some something 👋',
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
