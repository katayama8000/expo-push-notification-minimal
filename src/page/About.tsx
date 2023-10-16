import React, { FC, useState } from 'react';
import { View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

// push通知が来た時に表示する画面
// 持ち物の確認を促す
// 全ての持ち物を確認したら、画面遷移
const initialDummy = [false, false, false];

export const AboutScreen: FC = () => {
  const [dummy, setDummy] = useState<typeof initialDummy>(initialDummy);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {dummy.map((item, index) => {
        return (
          <CheckBox
            key={index}
            disabled={false}
            value={item}
            onValueChange={(newValue) =>
              setDummy(
                dummy.map((item, i) => {
                  if (i === index) {
                    return newValue;
                  }
                  return item;
                })
              )
            }
          />
        );
      })}
    </View>
  );
};
