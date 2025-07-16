import { Injectable } from '@nestjs/common';
import { staff, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StaffService {

  constructor(private prisma: PrismaService, private jwtService: JwtService) {}


  async create(data: staff):Promise<any> {
     const hashedPassword: string = await bcrypt.hash(data.password, 10); 
     const createdStaff: staff =await this.prisma.staff.create({
      data:{...data,
      password: hashedPassword,
     }
     });
     const accessToken = this.jwtService.sign({ userId: createdStaff.id, username: createdStaff.username });
     return { data: createdStaff, accessToken };
  }

  async validateUser(username: string, password: string, hospital: string): Promise<any> {
  // หา user โดย username และ hospital
  const user = await this.prisma.staff.findFirst({
    where: {
      username: username,
      
    },
    
  });

  // ถ้าพบ user และ password ตรงกัน
  if (user && await bcrypt.compare(password, user.password)) {
    // ลบ password ออกก่อนส่งคืน
    const { password, ...result } = user;
    return result;
  }

  // กรณีไม่พบ user หรือ password ไม่ตรง
  return null;
}

    
    async login(user:any): Promise<any> {
        const payload = {username: user.username,sub: user.id};
        const accesstoken = this.jwtService.sign(payload);
        user.accesstoken = accesstoken;
        return {
            user: user,
        };

      }
  
}
