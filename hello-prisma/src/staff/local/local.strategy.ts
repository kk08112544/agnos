import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StaffService } from '../staff.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: StaffService) {
    super();
  }

  async validate(username: string, password: string,hospital:string){
    const user = await this.authService.validateUser(username, password,hospital);
    if (!user) {
      throw new UnauthorizedException({
        message: ['Something is wrong I can feel it'],
      });
    }
    return user;
  }
}


