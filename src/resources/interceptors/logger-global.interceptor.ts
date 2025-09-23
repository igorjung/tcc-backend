import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

import { UserRequest } from '../guards/auth.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();

    const request = httpContext.getRequest<Request | UserRequest>();
    const { path, method } = request;

    const response = httpContext.getResponse<Response>();
    const { statusCode } = response;

    this.logger.log(`${method} ${path}`);

    const previousInstant = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('user' in request)
          this.logger.log(`Rota acessada pelo usuário ${request.user.sub}`);

        const routeExecutionTime = Date.now() - previousInstant;
        this.logger.log(
          `Resposta: status ${statusCode} - ${routeExecutionTime}ms`,
        );
      }),
    );
  }
}
