import React, { FC, useState } from 'react';
import { Button, View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../App';
import { object, string } from 'yup';

const schema = object({
  destination: string().required(),
});

export const HomeScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp>();
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="about"
        onPress={() => {
          navigate('About');
        }}
      />
    </View>
  );
};
