import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { PrismaService } from 'src/prisma.service'; // Import your PrismaService
import { jwtConstants } from './constant/constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret, // Use a strong secret key here
      signOptions: { expiresIn: '2h' }, // Adjust token expiration time as needed
    }),
  ],
  controllers: [StaffController],
  providers: [StaffService,PrismaService, LocalStrategy, JwtStrategy],
})
export class StaffModule {}
