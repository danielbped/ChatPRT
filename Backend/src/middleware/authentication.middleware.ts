import { StatusCodes } from "http-status-codes"
import { NextFunction, Request, Response } from 'express'
import ErrorMessage from "../utils/ErrorMessage"
import { Injectable, NestMiddleware } from "@nestjs/common"

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization

      if (!token || typeof token !== 'string') {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessage.TokenNotFound })
      }

      const parsedToken = token.split(' ')[1]

      if (!parsedToken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessage.InvalidToken })
      }

     return next()
    } catch (err: any) {
      console.error(err)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message || ErrorMessage.InternalServerError })
    }
  }
}