import { ErrorTypes } from "../errors/errorCatalog"
import { IUserEntity, IUserResponse } from "../interfaces/IUser"

export default class UserService {

    constructor(private _userEntity: IUserEntity) { }

    private async validadeId(id: number | undefined): Promise<void> {

        if (typeof id !== "number") {
            throw new Error(ErrorTypes.IdNumberError)
        }

        await this._userEntity.getById(id)
    }

    public async getById(id: number): Promise<IUserResponse> {
        await this.validadeId(id)
        const user = await this._userEntity.getById(id)
        return user
    }

}