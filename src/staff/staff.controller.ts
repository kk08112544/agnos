import { Controller, Get, Post, Body, Patch, Param, Delete,Res,UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import {Staff} from './staff.model'
import { Response } from 'express';
import { LocalAuthGuard } from "./local/local-auth.guard";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { Request } from '@nestjs/common';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

@Post('/create')
async create(@Body() postData: Staff, @Res() res: Response): Promise<any> {
  if ( !postData.name?.trim() ||
  !postData.lastname?.trim() ||
  !postData.username?.trim() ||
  !postData.password?.trim() ||
 ! postData.hospital?.trim()) {
    return res.status(400).json({ error: 'Content is not empty' });
  }

  try {
    const data = await this.staffService.create(postData);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error message' });
  }
}


   @Post('/login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req:any,  @Res() res: Response) :Promise<any>{
        const loginResult = await this.staffService.login(req.user);
        return res.status(200).json(loginResult);
    }



 
}
