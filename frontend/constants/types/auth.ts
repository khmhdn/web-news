export interface InputFieldData {
  value: string;
  errorMessage: string;
  suceedMessage: string;
}

export interface RegisterData {
  email: InputFieldData;
  password: InputFieldData;
  agreed: InputFieldData;
}

export interface ApiLoginData {
  username: string;
  password: string;
}

export interface ApiRegisterData {
  email: string;
  username: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
