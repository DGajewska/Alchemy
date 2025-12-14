import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'

export const encryptPassword = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const saltRounds = process.env.SALT_ROUNDS
    if (typeof saltRounds != 'string')
      throw Error('Cannot encrypt password, SALT_ROUNDS not set in env file')
    await bcrypt.hash(req.body.password, parseInt(saltRounds)).then((hash) => {
      req.body.password = hash
      next()
    })
  }
}
