export interface LoginCreds {
  username: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  username: string;
  password: string;
  userType: "principal" | "teacher" | "student";
  teacherId?: string;
}

export interface UserState {
  isLoggedIn: boolean;
  error: string;
  user: User | undefined;
}
