
// local-auth.guard.ts
import { Injectable, ExecutionContext, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { username, password, hospital } = request.body;

    if (!username || !password || !hospital) {
      throw new BadRequestException('Username, password, and hospital are required.');
    }

    // ✅ เพิ่ม hospital เข้า request เพื่อส่งต่อให้ LocalStrategy
    request.hospital = hospital;

    return super.canActivate(context) as Promise<boolean>;
  }
}
