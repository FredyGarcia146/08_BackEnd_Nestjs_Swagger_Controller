import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/jwt.constant';

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  
  async validate(payload: any) {
    console.log("llega a guard 02")
    console.log(payload)
    return { email: payload.email};
    //return { email: payload.email, role: payload.role, id: payload.id };
  }
}