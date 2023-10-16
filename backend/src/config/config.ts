import dotenv from "dotenv"

dotenv.config()

interface IConfig {
    PORT: string
    JWT_KEY: string
    DATABASE_URL: string
}

export const config: IConfig = {
    PORT: process.env.PORT || "4000",
    JWT_KEY: process.env.JWT_KEY || "developmentKey",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/gerenciadorDeProdutos?schema=public"
}