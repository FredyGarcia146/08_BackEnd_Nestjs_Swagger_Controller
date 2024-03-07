import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { jwtConstants } from '../constants/jwt.constant';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
  
      const accesstoken = this.extractTokenFromHeader(request);

      console.log(accesstoken)
      //const refreshToken = this.extractRefreshTokenFromHeader(request);
      //console.log(refreshToken)

      if (!accesstoken) {
        throw new UnauthorizedException();
      }
  
      try {
        const payload = await this.jwtService.verifyAsync(accesstoken, {
          secret: jwtConstants.secret,
        });
        request.user = payload;
      } catch {
        throw new UnauthorizedException();
      }
  
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, accesstoken] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? accesstoken : undefined;
    }

    private extractRefreshTokenFromHeader(request: Request): string | undefined {
      const [type, refreshToken] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? refreshToken : undefined;
    }

  }