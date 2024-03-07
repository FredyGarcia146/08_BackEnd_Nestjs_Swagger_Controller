//import { Injectable } from '@nestjs/common';
//
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

import { JwtService } from '@nestjs/jwt';

import * as bcryptjs from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/modelo/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register({ username, email, password }: RegisterAuthDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const newUser = await this.usersService.createUser({
      username,
      email,
      password: await bcryptjs.hash(password, 10),
    });

    const payload = {
      email: newUser.email,
      role: newUser.role,
      id: newUser.id,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      email,
      accessToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }
    return user;
  }

  async login({ email, password }: LoginAuthDto) {
    const user = await this.validateUser(email, password);

    /*
        const user = await this.usersService.findOneByEmailWithPassword(email);
        if (!user) {
          throw new UnauthorizedException('email is wrong');
        }
    
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('password is wrong');
        }
        */

    const payload = { email: user.email, role: user.role, id: user.id };
    //const payload = { email: user.email, role: user.role, id: user.id };
    const role = user.role;
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(
      { email: user.email },
      {
        expiresIn: '1h',
      },
    );

    console.log(email, accessToken);
    return {
      email,
      role,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(user: User) {
    const userOauth = await this.usersService.findOneByEmail(user.email);

    const payload = {
      email: userOauth.email,
      role: userOauth.role,
      id: userOauth.id,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }

  async GoogleLoginToken(user: User) {
    const userOauthGoogle = await this.usersService.findOneByEmail(user.email);

    if (!userOauthGoogle) {
      const newUserOauthGoogle = {
        username: user.username,
        email: user.email,
        password: await bcryptjs.hash('ENV_Constraseña_DEFAULT', 10),
      };
      
      const userGoogle = await this.usersService.createUser(newUserOauthGoogle);
      const payload = {
        email: userGoogle.email,
        role: userGoogle.role,
        id: userGoogle.id,
      };
      const role = userGoogle.role;
      const email = userGoogle.email;
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(
        { email: userGoogle.email },
        {
          expiresIn: '1h',
        },
      );

      return {
        email,
        role,
        accessToken,
        refreshToken,
      };
    } else {
      const userGoogle = userOauthGoogle;

      const payload = {
        email: userGoogle.email,
        role: userGoogle.role,
        id: userGoogle.id,
      };
      const role = userGoogle.role;
      const email = userGoogle.email;
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(
        { email: userGoogle.email },
        {
          expiresIn: '1h',
        },
      );

      return {
        email,
        role,
        accessToken,
        refreshToken,
      };
    }
  }

  async googleLogin(user: User) {
    const usere = await this.usersService.findOneByEmail(user.email);

    const payload = { email: usere.email, role: usere.role, id: usere.id };
    console.log(payload);
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }

  /*
  async profile({ email, role }: { email: string; role: string }) {
    return await this.usersService.findOneByEmail(email);
  }
  */

  /*
      async createAccessToken(userId: string) {
        return this.jwtService.sign({ id: userId }, { expiresIn: '15m' });
      }
    
      async createRefreshToken(userId: string) {
        const tokenId = uuid();
        return this.jwtService.sign({ id: userId, tokenId: tokenId }, { expiresIn: '7d' });
      }
    
      async validateUser(payload: any): Promise<any> {
        // Validate the user exists in your database, etc.
        return { id: payload.id };
      }

    */
}
