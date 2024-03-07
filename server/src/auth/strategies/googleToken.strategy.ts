import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/jwt.constant';

export class GoogleJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-google',
) {
  
  constructor() { 
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //ExtractJwt.fromBodyField('id_token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
    
  } 

  
  async validate(payload: any) {
    return { email: payload.email, username: payload.username};
    //return { email: payload.email, role: payload.role, id: payload.id };
  }
}