
import joi from 'joi';
export interface IAddress {
    state: string
    zip: string
    street: string
    city:string,
    userId:number
}

const AddressSchema = joi.object<IAddress>({
    state: joi.string().required().min(3),
    zip: joi.string(),
    city: joi.string().required(),
    street:joi.string().required().min(5),
    userId: joi.number().required()
})
const UpdateaddressSchema = joi.object<IAddress>({
    state: joi.string().required().min(3),
    zip: joi.string(),
    city: joi.string().required(),
    street:joi.string().required().min(5),
})
const UserIdValidation = joi.object({
    userId: joi.number().required()
})
export  {AddressSchema, UpdateaddressSchema,UserIdValidation}