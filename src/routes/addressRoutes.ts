import AddressService from '../services/address/AddressService';
import { Request, Response } from 'express';

async function createNewAddress(req:Request, res: Response){
    return await AddressService.createNewAddress(req, res);
}

async  function updateAddress(req:Request, res: Response){
    return await AddressService.updateAddress(req, res);
}

async function getAddressByUserId(req:Request, res: Response){
 return await AddressService.getAddressByUserId(req, res);
}


export default  {
    createNewAddress,
    updateAddress,
    getAddressByUserId
}