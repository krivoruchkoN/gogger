import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  btnStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
}

const SimpleButton = ({
  title,
  onPress,
  btnStyle = {},
  textStyle = {},
  activeOpacity = 0.8,
}: Props) => (
  <TouchableOpacity
    style={{ ...styles.wrap, ...btnStyle }}
    onPress={onPress}
    activeOpacity={activeOpacity}
  >
    <Text style={{ ...styles.text, ...textStyle }}>{title}</Text>
  </TouchableOpacity>
);

export default SimpleButton;

const styles = StyleSheet.create({
  wrap: {
    minHeight: 40,
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
    borderRadius: 10,
    padding: 15,
  },
  text: {
    color: '#333',
  },
});
