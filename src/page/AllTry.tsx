import React, { FC, useEffect, useState } from 'react';
import { Button, View, Text, FlatList } from 'react-native';
import { Card } from '../component/Card';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../App';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../lib/FBConfig';

type Item = {
  id: number;
  title: string;
  description: string;
};

export const AllTryScreen: FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="新規作成"
        onPress={() => {
          navigation.navigate('NewTry');
        }}
      />
      {/* <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Empty />}
        onRefresh={refreshing}
        refreshing={isRefresh}
      /> */}
    </View>
  );
};
