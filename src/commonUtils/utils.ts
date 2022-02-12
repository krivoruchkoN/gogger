import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface OneButtonAlertOptions {
  title: string;
  description: string;
  btnText?: string;
  onPress: () => void;
}

interface TwoButtonAlertOptions {
  title: string;
  description: string;
  btnOkText?: string;
  btnCancelText?: string;
  onPressOk: () => void;
  onPressCancel: () => void;
}

export const createOneButtonAlert = ({
  title,
  description,
  btnText = 'Ок',
  onPress,
}: OneButtonAlertOptions) =>
  Alert.alert(title, description, [{ text: btnText, onPress }]);

export const createTwoButtonAlert = ({
  title,
  description,
  btnOkText = 'Ок',
  btnCancelText = 'Отмена',
  onPressOk,
  onPressCancel,
}: TwoButtonAlertOptions) =>
  Alert.alert(title, description, [
    {
      text: btnCancelText,
      onPress: onPressCancel,
      style: 'cancel',
    },
    { text: btnOkText, onPress: onPressOk },
  ]);

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const setTokensToStorage = async ({
  accessToken,
  refreshToken,
}: Tokens): Promise<void> => {
  await AsyncStorage.setItem('accessToken', accessToken);
  await AsyncStorage.setItem('refreshToken', refreshToken);
};
