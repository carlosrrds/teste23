import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ErrorTypes, errorCatalog } from "../errors/errorCatalog";

const errorHandler: ErrorRequestHandler = (error: Error, _request: Request, res: Response, _next: NextFunction) => {

    const messageAsErrorType = error.message as ErrorTypes;

    const mappedError = errorCatalog[messageAsErrorType];

    if (mappedError) {
        const { status, message } = mappedError;
        return res.status(status).json({ error: message });
    }


    return res.status(500).json({ message: 'Erro Interno do Servidor' })
}

export default errorHandler