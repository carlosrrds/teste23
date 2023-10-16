import UserEntity from "../../Entities/user.entity";
import LoginController from "./login.controller";
import SignUpService from "../../services/signUp.service";
import SignInService from "../../services/signIn.service";

export default class LoginControllerFactory {
    static Make() {
        const userEntity = new UserEntity()
        const signInService = new SignInService(userEntity)
        const signUpService = new SignUpService(userEntity)
        const loginController = new LoginController(signUpService, userEntity, signInService)
        return loginController
    }
}