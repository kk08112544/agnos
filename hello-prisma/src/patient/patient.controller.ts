import { Controller, Get, Post, Body, Patch, Param, Delete,Res,UseGuards,ValidationPipe  } from '@nestjs/common';
import { PatientService } from './patient.service';
import { patient } from './patient.model';
import { Response } from 'express';
import { Request } from '@nestjs/common';
import { search } from './patientsearch.model';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

@Post('create')
async create(@Body() postData: patient, @Res() res: Response): Promise<any> {
  if (
    !postData.first_name_th?.trim() ||
    !postData.last_name_th?.trim() ||
    !postData.first_name_en?.trim() ||
    !postData.last_name_en?.trim() ||
    !postData.date_of_birth ||
    !postData.patient_hn?.trim() ||
    !postData.national_id?.trim() ||
    !postData.passport_id?.trim() ||
    !postData.phone_number?.trim() ||
    !postData.email?.trim() ||
    !postData.gender?.trim()
  ) {
    return res.status(400).json({ error: 'Content is not empty' });
  }

  // แปลงวันที่
  const dateOfBirth = new Date(postData.date_of_birth);
  if (isNaN(dateOfBirth.getTime())) {
    return res.status(400).json({ error: 'Invalid date_of_birth format' });
  }
  postData.date_of_birth = dateOfBirth;

  try {
    const data = await this.patientService.create(postData);
    return res.status(201).json(data);
  } catch (error: any) {
    console.error('Create patient error:', error);
    if (error.message === 'Invalid gender value') {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error', detail: error.message });
  }
}

@Post('search')
async findPatient(@Body() postData: search, @Res() res: Response): Promise<any>{
     if (
    !postData.national_id?.trim() &&
    !postData.passport_id?.trim() &&
     !postData.first_name_th?.trim() &&
     !postData.middle_name_th?.trim() &&
    !postData.last_name_th?.trim() &&
    !postData.first_name_en?.trim() &&
    !postData.middle_name_en?.trim() &&
    !postData.last_name_en?.trim() &&
    !postData.date_of_birth &&
    !postData.phone_number?.trim() &&
    !postData.email?.trim() 
  ) {
    return res.status(400).json({ error: 'Required fields are missing or empty' });
  }
   // แปลงวันที่
    let dateOfBirth: Date | undefined = undefined;
  if (postData.date_of_birth) {
    dateOfBirth = new Date(postData.date_of_birth);
    if (isNaN(dateOfBirth.getTime())) {
      return res.status(400).json({ error: 'Invalid date_of_birth format' });
    }
  }
  try{
     const data = await this.patientService.search(postData);
            if (data) {
                res.status(201).json(data); 
            } else {
                res.status(400).json({ error: 'Patient Id is not found' }); 
            }
  }catch(error){
    return res.status(500).json({ error: 'Internal server error', detail: error.message });
  }
}
    

  @Get('search/:id')
  async findOne(@Param('id') id: number, @Res() res: Response):Promise<any> {
     try {
            const data = await this.patientService.findOne(id);
            if (data) {
                res.status(201).json(data); 
            } else {
                res.status(400).json({ error: 'Patient Id is not found' }); 
            }
        } catch (error) {
            res.status(500).json({ error: 'Error message' });
        }
  }


}
