import { prisma } from "../prisma";
import { IUserCreate, IUserResponse } from "../interfaces/IUser";
import { User } from "@prisma/client";
import { ErrorTypes } from "../errors/errorCatalog";

export default class UserEntity {
    public async existByEmail(email: string): Promise<Boolean> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })
        if (user) {
            return true
        }
        return false
    }

    public async create(data: IUserCreate): Promise<User> {
        const createdUser = await prisma.user.create({
            data
        })
        return createdUser
    }

    public async findByEmail(email: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new Error(ErrorTypes.LoginCredentialError)
        }
        return user
    }

    public async getById(id: number): Promise<IUserResponse> {
        const user = await prisma.user.findUnique({
            where: { id }
        })
        if (user) {
            return user
        }
        throw new Error(ErrorTypes.IdNotFouldError)
    }


}