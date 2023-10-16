import { NextFunction, Request, Response } from "express";
import { ErrorTypes } from "../errors/errorCatalog";
import { config } from "../config/config";
import { verify } from "jsonwebtoken";
import UserEntity from "../Entities/user.entity";


const ensureAuthMiddlewere = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new Error(ErrorTypes.MissingHeaderError)
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
        throw new Error(ErrorTypes.TokenNotFoundError)
    }

    const secretKey = config.JWT_KEY

    verify(token, secretKey, (err, decoded) => {
        if (!decoded) {
            throw new Error(ErrorTypes.InvalidTokenError)
        }
        const { id, name, isAdmin } = <any>decoded
        req.body.user = { id, name, isAdmin }
    })

    const userEntity = new UserEntity()

    const user = await userEntity.getById(req.body.user.id)
    if (!user) {
        throw new Error(ErrorTypes.IdNotFouldError)
    }

    next()
}

export default ensureAuthMiddlewere