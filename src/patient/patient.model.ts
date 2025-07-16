import {Prisma} from "@prisma/client"

export class patient{
    first_name_th: string
  middle_name_th?: string|null
  last_name_th: string
  first_name_en :string
  middle_name_en ?:string|null
  last_name_en :string
  date_of_birth :Date
  patient_hn :string
  national_id :string
  passport_id :string
  phone_number :string
  email: string
  gender  :String
}
