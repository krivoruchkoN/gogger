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

const getDefaultErrorAlert = (): void =>
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

const globalErrorHandler = (error: any | AxiosError) => {
  const statusCode = error?.response?.status;
  switch (true) {
    case statusCode === 401:
      console.log('!!! в глобальном обработчике ошибок статус код 401');
      console.log('!!! TODO выкинуть на экран логина и пароля');
      break;
    case statusCode === 404:
      getAlertError404();
      break;
    default:
      getDefaultErrorAlert();
      break;
  }
};

export default globalErrorHandler;
