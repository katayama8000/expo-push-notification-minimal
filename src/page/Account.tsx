import React, { FC } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export const AccountScreen: FC = () => {
  const user = {
    username: 'John Doe',
    email: 'johndoe@example.com',
    profileImage: 'https://dummyimage.com/150x150/000/fff',
  };

  const handleEditProfile = () => {
    // プロフィール編集の処理を実装する
  };

  const handleLogout = () => {
    // ログアウトの処理を実装する
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>プロフィール編集</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
