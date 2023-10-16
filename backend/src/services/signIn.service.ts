import { User } from "@prisma/client";
import { ErrorTypes } from "../errors/errorCatalog";
import { ISignInPaylold, IUserEntity } from "../interfaces/IUser";
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "../config/config"

export default class SignInService {

    constructor(private _userEntity: IUserEntity) { }

    public async execute(signInData: ISignInPaylold): Promise<{ token: string }> {
        const { email, password } = signInData
        this.validade(email, password)
        const user = await this.getUserByEmail(email as string)
        await this.decripPassword(password as string, user.password_hash)
        console.log(password, user.password_hash)
        const token = await this.createToken(user)
        return token
    }

    private validade(email: string | undefined, password: string | undefined): void {
        this.validateEmail(email)
        this.validatePassword(password)
    }

    private validateEmail(email: string | undefined): void {

        if (!email) {
            throw new Error(ErrorTypes.EmailRequiredError)
        }

        if (typeof email !== "string") {
            throw new Error(ErrorTypes.EmailStringError)
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(email)

        if (!isValidEmail) {
            throw new Error(ErrorTypes.ValidEmailError)
        }
    }

    private validatePassword(password: string | undefined): void {

        if (!password) {
            throw new Error(ErrorTypes.PasswordRequiredError)
        }

        if (typeof password !== "string") {
            throw new Error(ErrorTypes.PasswordStringError)
        }

    }

    private async getUserByEmail(email: string): Promise<User> {
        const user = await this._userEntity.findByEmail(email)
        return user
    }

    private async decripPassword(password: string, hashPassword: string): Promise<void> {
        const passwordMatch = await bcrypt.compare(password, hashPassword)
        if (!passwordMatch) {
            throw new Error(ErrorTypes.LoginCredentialError)
        }

    }

    private async createToken(user: User): Promise<{ token: string }> {
        const { id, name, email, isAdmin } = user
        const secretSKey = config.JWT_KEY
        const expiresIn15Minutes = 15 * 60
        const token = jwt.sign({ id, name, email, isAdmin }, secretSKey, { expiresIn: expiresIn15Minutes })
        if (!token) {
            throw new Error(ErrorTypes.UnauthorizedError)
        }
        return { token }
    }
}