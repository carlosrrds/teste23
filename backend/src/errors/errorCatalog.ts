type ErrorResponseObject = {
    message: string;
    status: number
}

export enum ErrorTypes {
    NameRequiredError = 'NameRequiredError',
    NameStringError = 'NameStringError',
    NameSizeError = 'NameSizeError',
    ValidNameError = 'ValidNameError',
    EmailRequiredError = 'EmailRequiredError',
    EmailSizeError = 'EmailSizeError',
    EmailStringError = 'EmailStringError',
    ValidEmailError = 'ValidEmailError',
    DuplicateEmailError = 'DuplicateEmailError',
    PasswordRequiredError = 'PasswordRequiredError',
    PasswordStringError = 'PasswordStringError',
    PasswordSizeError = 'PasswordSizeError',
    DescriptionRequiredError = 'DescriptionRequiredError',
    DescriptionStringError = 'DescriptionStringError',
    DescriptionSizeError = 'DescriptionSizeError',
    PriceRequiseredError = 'PriceRequiseredError',
    PriceNumberError = 'PriceNumberError',
    PriceNegativeError = 'PriceNegativeError',
    ProductNotFould = 'ProductNotFould',
    LoginCredentialError = 'LoginCredentialError',
    UnauthorizedError = 'UnauthorizedError',
    IdNumberError = 'IdNumberError',
    IdNotFouldError = 'IdNotFouldError',
    MissingHeaderError = 'MissingHeaderError',
    TokenNotFoundError = 'TokenNotFoundError',
    InvalidTokenError = 'InvalidTokenError'
}

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>

export const errorCatalog: ErrorCatalog = {
    NameRequiredError: {
        message: 'Nome obrigatório',
        status: 400
    },
    NameStringError: {
        message: 'Nome deve ser uma string',
        status: 400
    },
    NameSizeError: {
        message: 'Nome deve ter entre 3 e 255 caracteres',
        status: 400
    },
    ValidNameError: {
        message: 'Nome ja cadastrado',
        status: 400
    },
    EmailRequiredError: {
        message: 'E-mail obrigatório',
        status: 400
    },
    EmailSizeError: {
        message: 'E-mail deve conter entre 3 e 255 caracteres',
        status: 400
    },
    EmailStringError: {
        message: 'E-mail deve ser uma string',
        status: 400
    },
    ValidEmailError: {
        message: 'O campo deve ser do tipe email',
        status: 400
    },
    DuplicateEmailError: {
        message: 'Email já registrado',
        status: 400
    },
    PasswordRequiredError: {
        message: 'Password obrigatório',
        status: 400
    },
    PasswordStringError: {
        message: 'Password deve ser uma string',
        status: 400
    },
    PasswordSizeError: {
        message: 'Password deve ter entre 6 e 50 caracteres',
        status: 400
    },
    DescriptionRequiredError: {
        message: 'Descrição obrigatória',
        status: 400
    },
    DescriptionStringError: {
        message: 'Descrição deve ser uma string',
        status: 400
    },
    DescriptionSizeError: {
        message: 'Descrição deve ter entre 1 e 2000 caracteres',
        status: 400
    },
    PriceRequiseredError: {
        message: 'Preço obrigatório',
        status: 400
    },
    PriceNumberError: {
        message: 'Preço deve ser um número maior ou igual a zero',
        status: 400
    },
    ProductNotFould: {
        message: 'ID do produto não encontrado',
        status: 400
    },
    PriceNegativeError: {
        message: 'Preço não pode ter valor negativo',
        status: 400
    },
    LoginCredentialError: {
        message: 'Email ou senha invalido',
        status: 401
    },
    UnauthorizedError: {
        message: 'Usuario não autorizado',
        status: 401
    },
    IdNumberError: {
        message: 'Id deve ser um número',
        status: 400
    },
    IdNotFouldError: {
        message: 'Id não consta no banco de dados',
        status: 404
    },
    MissingHeaderError: {
        message: 'Header authorization necessario',
        status: 401
    },
    TokenNotFoundError: {
        message: 'Token não encontrado',
        status: 401
    },
    InvalidTokenError: {
        message: 'Token Inválido',
        status: 401
    }
}