import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleGuardPrueba extends AuthGuard('google') {}
console.log("llega google")