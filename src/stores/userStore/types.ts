export interface UserName {
  firstName: string;
  middleName?: string;
  lastName: string;
  nickName?: string;
}

export interface UserAuth {
  login: string;
  password: string;
}

type ISODate = string;

export interface User {
  id: string;
  name: UserName;
  email: string;
  phoneNumber?: string;
  lastLogin: ISODate;
}

export interface CurrentUser extends User {
  auth: UserAuth;
}

export interface APIUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  birth_date: string | null;
  description: string | null;
  gender: string | null;
}
// обсудить DTO

export interface APIUserResults {
  results: APIUser[];
}
