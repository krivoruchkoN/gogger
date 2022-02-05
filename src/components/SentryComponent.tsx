/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Sentry from '@sentry/react-native';

const generateRandomNum = (): number =>
  Math.floor(Math.random() * (1000 - 100)) + 100; // генерируем 3ёх значное число
const createSentryTextError = (): void => {
  Sentry.setContext('Context', { text: 'Сюда передаём контекст ошибки' });
  Sentry.captureMessage('Текстовая ошибка');
};

const SentryComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [randomNum, setRandomNum] = useState(generateRandomNum());
  const createSentryError = (): void => {
    Sentry.setContext('Context', { randomNum });
    Sentry.captureMessage(`New Error from mobile app ${randomNum}`);
    setRandomNum(generateRandomNum());
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisible((prev) => !prev)}
        activeOpacity={0.8}
      >
        <Text>{`${isVisible ? 'Скрыть' : 'Показать'} кнопки для Sentry`}</Text>
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.wrap}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={createSentryError}
              activeOpacity={0.8}
            >
              <Text>{`Отправить ошибку с номером ${randomNum} в Sentry`}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={createSentryTextError}
              activeOpacity={0.8}
            >
              <Text>Отправить текстовую ошибку в Sentry</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default SentryComponent;

const styles = StyleSheet.create({
  wrap: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    height: 150,
  },
  button: {
    minHeight: 40,
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
    borderRadius: 10,
    padding: 15,
  },
});
