import { User } from "@prisma/client";
import { ErrorTypes } from "../errors/errorCatalog";
import { ISignUpPaylold, IUserEntity } from "../interfaces/IUser";
import * as bcrypt from "bcrypt"



export default class SignUpService {

    constructor(private _userEntity: IUserEntity) { }

    public async execute(userData: ISignUpPaylold): Promise<User> {
        const { name, email, password, isAdmin } = userData
        await this.validate(userData)
        const hashedPassowrd = await this.encrypt(password as string)
        const createdUser = await this.createUser(name as string, email as string, hashedPassowrd, isAdmin)
        return createdUser
    }

    private async validate({ name, email, password }: ISignUpPaylold): Promise<void> {
        this.validateName(name)
        this.validatePassword(password)
        await this.validateEmail(email)
    }

    private validateName(name: string | undefined): void {

        if (!name) {
            throw new Error(ErrorTypes.NameRequiredError)
        }

        if (typeof name !== "string") {
            throw new Error(ErrorTypes.NameStringError)
        }

        const NAME_MIN_LENGTH = 3
        const NAME_MAX_LENGTH = 255

        if (name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH) {
            throw new Error(ErrorTypes.NameSizeError)
        }

    }

    private async validateEmail(email: string | undefined): Promise<void> {

        if (!email) {
            throw new Error(ErrorTypes.EmailRequiredError)
        }

        if (typeof email !== "string") {
            throw new Error(ErrorTypes.EmailStringError)
        }

        const EMAIL_MIN_LENGTH = 3
        const EMAIL_MAX_LENGTH = 255

        if (email.length < EMAIL_MIN_LENGTH || email.length > EMAIL_MAX_LENGTH) {
            throw new Error(ErrorTypes.EmailSizeError)
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(email)

        if (!isValidEmail) {
            throw new Error(ErrorTypes.ValidEmailError)
        }

        const isUserRegister = await this._userEntity.existByEmail(email)

        if (isUserRegister) {
            throw new Error(ErrorTypes.DuplicateEmailError)
        }
    }

    private validatePassword(password: string | undefined): void {

        if (!password) {
            throw new Error(ErrorTypes.PasswordRequiredError)
        }

        if (typeof password !== "string") {
            throw new Error(ErrorTypes.PasswordStringError)
        }

        const PASSWORD_MIN_LENGTH = 6
        const PASSWORD_MAX_LENGTH = 50

        if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
            throw new Error(ErrorTypes.PasswordSizeError)
        }
    }

    private async encrypt(value: string): Promise<string> {
        const encryptedValue = await bcrypt.hash(value, 10)
        return encryptedValue
    }

    private async createUser(name: string, email: string, password: string, isAdmin: string | undefined): Promise<User> {
        const normalizeIsAdmin = isAdmin?.toLowerCase() === 'true' ? true : false
        const normalizeUser = {
            name,
            email,
            password_hash: password,
            isAdmin: normalizeIsAdmin
        }
        const createdUser = await this._userEntity.create(normalizeUser)
        return createdUser
    }
}