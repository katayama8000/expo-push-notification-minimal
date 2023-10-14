import React, { FC } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TouchableButtonProps = {
  icon?: string;
  label: string;
  onPress?: () => void;
  backgroundColor?: string;
};

export const TouchableButton: FC<TouchableButtonProps> = ({
  icon,
  label,
  onPress,
  backgroundColor,
}) => {
  const buttonStyle = {
    ...styles.button,
    backgroundColor: backgroundColor,
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <View style={styles.buttonContent}>
        {icon && <Ionicons size={24} color="white" />}
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 10,
    margin: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
});
