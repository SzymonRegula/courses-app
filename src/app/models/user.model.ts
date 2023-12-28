export type UserRequest = {
  email: string;
  password: string;
};

export type User = UserRequest & {
  name: string | null;
  role: 'admin' | 'user';
  id: string;
};

export type UserResponse = {
  successful: boolean;
  result: User;
};
