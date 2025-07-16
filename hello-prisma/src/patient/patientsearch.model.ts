import {Prisma} from "@prisma/client"

export class search{
    national_id ?:string|null
  passport_id ?:string|null
    first_name_th?: string|null
  middle_name_th?: string|null
  last_name_th?: string|null
  first_name_en? :string|null
  middle_name_en ?:string|null
  last_name_en ?:string|null
  date_of_birth ?:Date|null
  phone_number ?:string|null
  email?: string|null
}