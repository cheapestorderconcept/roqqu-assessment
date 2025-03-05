import { IAddress } from "./address.interface";
import db from '../../db/database';
import { DbTableName } from "../../common/constants";

async function addNewAddress(body:IAddress){
    try {
        await db.table(DbTableName.ADDRESS).insert({...body,});
        return body;
           } catch (error) {
            console.log(error)
           throw new Error(error);
     }
}

async function getAddressByUserId(id:number){
  return await  db.table(DbTableName.ADDRESS).select('*').where('userId', id).first();
}

async function updateUserAddress(body:IAddress, userId:number){
 return await  db.table(DbTableName.ADDRESS).update(body).where('userId', userId); 
}

export  default  {
    addNewAddress,
    getAddressByUserId,
    updateUserAddress
} as const