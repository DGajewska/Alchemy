type UserData = {
    firstName: string;
    lastName: string;
    aka: string | null;
    email: string;
}

export type CreateUserData = UserData & { password: string; }

export type UserResponse = 
    UserData & 
    { 
        id: string; 
        createdAt: Date;
        updatedAt: Date;
    }

