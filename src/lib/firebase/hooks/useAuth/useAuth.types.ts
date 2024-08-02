export interface ICreateUserParams {
  email: string;
  password: string;
  file: File | null;
  username: string;
  date: number;
  path?: string;
}

export interface ILoginUserParams {
  email: string;
  password: string;
  path?: string;
}
export enum EFirebase {
  users = 'users',
  userChats = 'userChats',
  chats = 'chats',
}
