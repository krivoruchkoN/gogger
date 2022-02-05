/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SimpleButton from './common/SimpleButton';
import amplitude from '../../amplitude';
import events from '../../amplitude/events';

const sendInfoRedButton = (): void => {
  amplitude.logEvent(events.clickToRedButton, {
    info: 'здесь инфо о красной таблетке',
  });
};
const sendInfoBlueButton = (): void => {
  amplitude.logEvent(events.clickToBlueButton, {
    info: 'здесь инфо о синей таблетке',
  });
};

const AmplitudeComponent = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View style={{ marginTop: 15 }}>
      <SimpleButton
        title={`${isVisible ? 'Скрыть' : 'Показать'} кнопки для Amplitude`}
        onPress={() => setIsVisible((prev) => !prev)}
      />
      {isVisible && (
        <View style={styles.wrap}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <SimpleButton
              btnStyle={{ backgroundColor: 'red' }}
              title="Выбрать красную таблетку"
              onPress={sendInfoRedButton}
            />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <SimpleButton
              btnStyle={{ backgroundColor: 'blue' }}
              textStyle={{ color: 'white' }}
              title="Выбрать синюю таблетку"
              onPress={sendInfoBlueButton}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AmplitudeComponent;

const styles = StyleSheet.create({
  wrap: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'gold',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    height: 150,
  },
});
