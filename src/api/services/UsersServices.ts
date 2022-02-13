import { AxiosResponse } from 'axios';

import $api from '../api';
import { APIUserResults } from '../../stores/userStore/types';
import routes from '../routes';

export default class UsersService {
  static fetchUsers = async (): Promise<AxiosResponse<APIUserResults>> =>
    $api.get(routes.user);
}
