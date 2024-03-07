import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// auth 
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './constants/jwt.constant';




import { PassportModule } from '@nestjs/passport';
//
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
//
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/modelo/user.entity';
import { GoogleJwtStrategy } from './strategies/googleToken.strategy';
import { GoogleStrategyPrueba } from './strategies/google-oauth-prueba.strategy';
//import { GoogleOAuthVerifyStrategy } from './strategies/google-oauth-verify.startegy';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret ,
      signOptions: { expiresIn: '5m' },
    }),
  ], 
  controllers: [AuthController],
  providers: [AuthService,RefreshJwtStrategy,UserService,GoogleStrategyPrueba,GoogleJwtStrategy],
  exports: [JwtModule]
})
export class AuthModule {}
