

// local.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StaffService } from '../staff.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private staffService: StaffService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true, // สำคัญมาก!
    });
  }

  async validate(req: any, username: string, password: string): Promise<any> {
    const hospital = req.hospital;
    const user = await this.staffService.validateUser(username, password, hospital);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials or hospital');
    }
    return user;
  }
}

