import { IAddress } from "./address.interface";
import db from '../../../db/database';

async function addNewAddress(body:IAddress, userId:number){
    try {
        const newAddress: IAddress = {
            ...body
        };
        await db.table('addresses').insert({...newAddress,});
        return newAddress;
           } catch (error) {
            console.log(error)
           throw new Error(error);
     }
}

async function getAddressByUserId(id:number){
  return await  db.table('addresses').select('*').where('userId', id).first();
}

async function updateUserAddress(body:IAddress, userId:number){
 return await  db.table('addresses').update(body).where('userId', userId); 
}

export  default  {
    addNewAddress,
    getAddressByUserId,
    updateUserAddress
} as const