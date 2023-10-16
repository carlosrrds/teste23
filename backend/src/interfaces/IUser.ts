import { User } from "@prisma/client"


export interface ISignUpService {
    execute(userData: ISignUpPaylold): Promise<User>
}

export interface ISignInService {
    execute(signInData: ISignInPaylold): Promise<{ token: string }>
}

export interface IUserService {
    getById(id: number): Promise<IUserResponse>
}

export interface IUserEntity {
    create(userData: IUserCreate): Promise<User>
    existByEmail(email: string): Promise<Boolean>
    findByEmail(email: string): Promise<User>
    getById(id: number): Promise<IUserResponse>
}

export interface IUserCreate {
    name: string
    email: string
    password_hash: string
    isAdmin: boolean
}

export interface ISignUpPaylold {
    name?: string
    email?: string
    password?: string
    isAdmin?: string
}

export interface ISignInPaylold {
    email?: string
    password?: string
}

export interface ISignIn {
    email: string
    password: string
}

export interface IUserResponse {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    activated: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    isAdmin: boolean;
}

export interface IProductWhereClausule {
    where: {

    };
    pagination: {
        page: number;
        limit: number;
    };
}