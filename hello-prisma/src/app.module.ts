import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffModule } from './staff/staff.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [StaffModule, PatientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
