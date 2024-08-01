export interface User {
  id: string;
  username: string;
  token: string;
  country_code: string;
  country_name: string;
}

export interface UserLoginDto {
  username: string;
}

export interface UserRegisterDto {
  username: string;
  country_code?: string;
  country_name?: string;
}
