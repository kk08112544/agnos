import { Injectable } from '@nestjs/common';
import { patient } from './patient.model';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PatientService {

    constructor(private prisma: PrismaService){}

async create(data: patient): Promise<any> {
  const allowedGenders = ['M', 'F'];
  const genderUpper = data.gender?.toUpperCase();

  if (!allowedGenders.includes(genderUpper)) {
    throw new Error('Invalid gender value');
  }

  try {
    const createdPatient = await this.prisma.patient.create({
      data: {
        ...data,
        gender: genderUpper,
      },
    });
    return { data: createdPatient };
  } catch (e) {
    console.error('Prisma create error:', e);
    throw e;
  }
}


  async findOne(id: number):Promise<any> {
  return this.prisma.patient.findUnique({
            where: { id: Number(id) },
          });
  }

}
