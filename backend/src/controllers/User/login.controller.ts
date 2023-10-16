import { Request, Response } from "express";
import { ISignInService, ISignUpService, IUserEntity } from "../../interfaces/IUser";

export default class LoginController {
    constructor(
        private _signUpService: ISignUpService,
        private _userEntity: IUserEntity,
        private _signInService: ISignInService
    ) { }
    async signUp(req: Request, res: Response) {
        const { name, email, password, isAdmin } = req.body
        const user = await this._signUpService.execute({ name, email, password, isAdmin })
        return res.status(201).json(user)
    }

    async signIn(req: Request, res: Response) {
        const { email, password } = req.body
        const response = await this._signInService.execute({ email, password })
        return res.status(200).json(response)
    }

}