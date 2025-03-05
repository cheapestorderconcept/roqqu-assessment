import AddressModel from '../../model/address/AddressModel'; 
import userModel from '../../model/user/userModel';
import { Request, Response } from 'express';
import HttpResponse from '../../utils/httpsResponse';
import HttpStatusCode from '../../common/HttpStatusCode';
import logger from 'jet-logger';
import { IAddress } from '../../model/address/address.interface';


async function createNewAddress(req:Request ,   res:Response){
   try {
      const body:IAddress = req.body;
        // const userId:number = req.body.userId as unknown as number;
        const user = await userModel.getUserById(body.userId );
        if (!user) {
        /***prevent creation of address if user doesn't exist*/
         HttpResponse.error(res,HttpStatusCode.BAD_REQUEST, 'No user is with provided id', 400);
         return;
        }
        const hasAddress = await AddressModel.getAddressByUserId(body.userId);
       if (hasAddress) {
        HttpResponse.error(res,HttpStatusCode.BAD_REQUEST, 'You have an address created. Proceed to update for modification', 400);
        return;
       }
      const  address  = AddressModel.addNewAddress(body ,  )
      HttpResponse.success(res, HttpStatusCode.CREATED, 'Address successfully created', address);
   } catch (error) {
    logger.err(error);
    HttpResponse.error(res,HttpStatusCode.INTERNAL_SERVER_ERROR, 'Internal server error', 500);
   }
}

async function getAddressByUserId(req:Request ,   res:Response){
    try {
        const userId:number = req.params.userId as unknown as number;
        const userAddress = await AddressModel.getAddressByUserId(userId);
        if (userAddress) {
         HttpResponse.success(res, HttpStatusCode.OK, 'Address details', {address:userAddress}); 
        }else{
        HttpResponse.success(res, HttpStatusCode.OK, 'You have not setup your address',);
        }
    } catch (error) {
        logger.err(error);
        HttpResponse.error(res,HttpStatusCode.INTERNAL_SERVER_ERROR, 'Internal server error', 500);
    }
}

async function updateAddress(req:Request ,   res:Response){
    try {
        const userId:number = req.params.userId as unknown as number; 
        const hasAddress = await AddressModel.getAddressByUserId(userId);
        if (!hasAddress) {
         HttpResponse.error(res,HttpStatusCode.BAD_REQUEST, 'Please setup an address first', 500);
         return;
        }
      const address  = await AddressModel.updateUserAddress(req.body , req.params.userId as unknown as number)
      if (address) {
        HttpResponse.success(res, HttpStatusCode.OK, 'Address successfully updated', address);
      }else{
       HttpResponse.error(res,HttpStatusCode.INTERNAL_SERVER_ERROR, 'An error occured', 500);
      }
    } catch (error) {
      HttpResponse.error(res,HttpStatusCode.INTERNAL_SERVER_ERROR, 'An error occured', 500); 
    }
}

export default   {
createNewAddress,
getAddressByUserId,
updateAddress,
}