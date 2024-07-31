export interface ICreateUserParams {
    email: string;
    password: string;
    file: File | null;
    username: string;
    date: number;
    usersPath: string;
    userChatsPath: string;
}

export interface ICreateUserOptions {
    navigate: (path: string) => void;
    setError: (value: boolean) => void;
    setLoading: (value: boolean) => void;
    path: string;
}