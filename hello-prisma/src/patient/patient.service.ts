import { Injectable } from '@nestjs/common';
import { patient } from './patient.model';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { search } from './patientsearch.model';

@Injectable()
export class PatientService {

    constructor(private prisma: PrismaService){}

  async search(data: search): Promise<any> {
  try {
    const where: any = {};
     if (data.national_id) where.national_id = data.national_id;
    if (data.passport_id) where.passport_id = data.passport_id;
    if (data.first_name_th) where.first_name_th = { contains: data.first_name_th };
     if (data.middle_name_th) where.middle_name_th = { contains: data.middle_name_th };
    if (data.last_name_th) where.last_name_th = { contains: data.last_name_th };
    if (data.first_name_en) where.first_name_en = { contains: data.first_name_en };
     if (data.middle_name_en) where.middle_name_en = { contains: data.middle_name_en };
    if (data.last_name_en) where.last_name_en = { contains: data.last_name_en };
     if (data.date_of_birth) where.date_of_birth = data.date_of_birth;
    if (data.phone_number) where.phone_number = data.phone_number;
    if (data.email) where.email = data.email;

    const foundPatients = await this.prisma.patient.findMany({
      where,
    });

    return foundPatients;
  } catch (e) {
    console.error('Prisma search error:', e);
    throw e;
  }
}

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
