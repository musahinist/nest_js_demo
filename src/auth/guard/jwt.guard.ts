import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  //   async canActivate(context: ExecutionContext) {
  //     const request = context.switchToHttp().getRequest();
  //     const authorization = request.headers.authorization;
  //     if (!authorization) {
  //       return false;
  //     }
  //     const token = authorization.split(' ')[1];
  //     const payload = await this.jwtService.verifyAsync(token);
  //     request.user = payload;
  //     return true;
  //   }
}
