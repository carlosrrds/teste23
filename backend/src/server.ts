import express from "express"
import "express-async-errors"
import { routes } from "./routes"
import errorHandler from "./middlewares/errorHandle.middleware"

const app = express()

app.use(express.json())

app.use(routes)

app.use(errorHandler)

app.listen(3333, () => console.log("Server is runnning in port 3333"))