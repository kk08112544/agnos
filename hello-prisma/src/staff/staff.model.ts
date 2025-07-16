import {Prisma} from "@prisma/client"

export class Staff{
    id:number
    name:string
    lastname:string
    username:string
    password:string
    hospital:string
}