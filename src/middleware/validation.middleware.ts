import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'

const handleValidationError = (res: Response, error: ZodError | unknown) => {
  if (error instanceof ZodError) {
    res
      .status(400)
      .json({ error: 'Invalid data submitted', details: z.flattenError(error) })
  } else {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const validateData = (schema: z.ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      handleValidationError(res, error)
    }
  }
}

export const validateIdParam = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      z.object({ id: z.uuid() }).parse(req.params)
      next()
    } catch (error) {
      handleValidationError(res, error)
    }
  }
}
