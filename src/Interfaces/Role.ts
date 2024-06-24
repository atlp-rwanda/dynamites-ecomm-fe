import User from "./user";

export default interface Role {
    id: number;
    name: string;
    users: User[];
    permissions: string[];
  }