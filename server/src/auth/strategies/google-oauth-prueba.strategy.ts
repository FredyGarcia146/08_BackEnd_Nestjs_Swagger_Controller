import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategyPrueba extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: '*****',
            clientSecret: '****',
            callbackURL: 'http://localhost:3001/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            //id_token,
            accessToken
        }
        done(null, user);
    }
}