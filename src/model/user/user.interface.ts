
import joi from "joi";
export interface IUser {
    name: string, 
    email:string
}

export interface IUserWithAddressDetails {
    name: string, 
    email:string
    address:{
        street: string,
        city: string,
        state: string,
        zip: string
    }
}
export interface IdParam {
    id: number
}
const User =  joi.object<IUser>({
    name: joi.string().required(),
    email: joi.string().email().required(),
})
const Id = joi.object<IdParam>({
    id: joi.number().required()
})

export interface OffsetPagination {
    pageNumber: number,
    pageSize: number
}
 const paginationDto = joi.object<OffsetPagination>({
    pageNumber: joi.number().required().min(1),
    pageSize: joi.number().required().min(1)
})
export  {User, Id, paginationDto} ;