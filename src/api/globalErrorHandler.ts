import { AxiosError } from 'axios';
import { createTwoButtonAlert } from '../commonUtils/utils';

const getAlertError404 = () =>
  createTwoButtonAlert({
    title: 'Ошибка 404',
    description: 'Отчёт был отправлен разработчикам',
    onPressOk: () => {
      console.log(
        '!!! TODO проверить. Реально ли падает ошибка в сентри. Если нет - отправить ошибку тут',
      );
    },
    onPressCancel: () => {
      console.log('!!! TODO добавить перезагрузку');
    },
  });

const getDefaultErrorAlert = () =>
  createTwoButtonAlert({
    title: 'Произошла ошибка',
    description: 'Отчёт был отправлен разработчикам',
    btnCancelText: 'Перезагрузить приложение',
    // eslint-disable-next-line sonarjs/no-identical-functions
    onPressOk: () => {
      console.log(
        '!!! TODO проверить. Реально ли падает ошибка в сентри. Если нет - отправить ошибку тут',
      );
    },
    onPressCancel: () => {
      console.log('!!! TODO добавить перезагрузку');
    },
  });

/* eslint-disable import/prefer-default-export */
// обсудить с мобильщиками
export const globalErrorHandler = (error: never | AxiosError): void => {
  // обсудить с мобильщиками правило линта с функциями без return и тип для этой ошибки
  const statusCode = error?.response?.status;
  switch (true) {
    case statusCode === 401:
      console.log('!!! в глобальном обработчике ошибок статус код 401');
      console.log('!!! TODO выкинуть на экран логина и пароля');
      break;
    case statusCode === 404:
      return getAlertError404();
    default:
      return getDefaultErrorAlert();
  }
};
