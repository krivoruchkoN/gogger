import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const SimpleButton = ({
  title,
  btnStyle,
  textStyle,
  onPress,
  activeOpacity,
}: {
  title: string;
  onPress: () => void;
  btnStyle?: Object;
  textStyle?: Object;
  activeOpacity?: number;
}) => (
  <TouchableOpacity
    style={{ ...styles.wrap, ...btnStyle }}
    onPress={onPress}
    activeOpacity={activeOpacity}
  >
    <Text style={{ ...styles.text, ...textStyle }}>{title}</Text>
  </TouchableOpacity>
);

SimpleButton.defaultProps = { btnStyle: {}, textStyle: {}, activeOpacity: 0.8 };

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
