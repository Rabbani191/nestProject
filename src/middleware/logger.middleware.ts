import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log(`Request - Method: ${req.method}, URL: ${req.originalUrl}`);
//     next();
//     console.log(`Response - Status: ${res.statusCode}`);
//   }
// }
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request method ${req.method}, URL: ${req.originalUrl}`);
  console.log(`response--> Status: ${res.statusCode}`);
  next();
}
