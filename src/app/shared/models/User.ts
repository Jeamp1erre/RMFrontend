export interface User {
    id: number | string; 
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
    role?: string; 
    password?: string; 
}

  
  export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
  }