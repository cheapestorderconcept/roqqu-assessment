
import userModel from '../../model/user/userModel'; 
import { Request, Response } from 'express';
import HttpResponse from '../../utils/httpsResponse';
import HttpStatusCode from '../../common/HttpStatusCode';
import logger from 'jet-logger';
import { OffsetPagination } from '@src/model/user/user.interface';
async function addUser(req:Request ,   res:Response) {
    try {
        //check if a user exists with the id
        const user = await userModel.getUserById(req.params.id as unknown as number);
        if (user) {
        /***prevent duplicate account creation and throw error */
         HttpResponse.error(res,HttpStatusCode.BAD_REQUEST, 'A user already exist with provided id', 400);
         return;
        }
        /***Proceed to account creation */
        const newUser = await userModel.createNewUser(req.body , req.params.id as unknown as number);
        if (newUser) {
            HttpResponse.success(res,HttpStatusCode.CREATED,'User created successfully', newUser, );
        }else{
          HttpResponse.error(res,HttpStatusCode.INTERNAL_SERVER_ERROR, 'An error occured', 400);
        }
    } catch (error) {
        /***Write error into files, send to channel for alerts or
         * any other error logging tools for further investigation
         */
       logger.err(error);
      HttpResponse.error(res,HttpStatusCode.INTERNAL_SERVER_ERROR, 'Internal server error', 400);
    }
}

async function getAllUsers(req:Request ,   res:Response) {
    try {
        const paginationDto = req.query as unknown as OffsetPagination;
        const users = await userModel.getUser(paginationDto);
        if(users!.length>0){
             HttpResponse.success(res, HttpStatusCode.OK, 'Users retrieved successfully', users);
        }else{
           HttpResponse.success(res, HttpStatusCode.OK, 'You currently have no user', users);
        }
    } catch (error) {
        /***Write error into files, send to channel for alerts or
         * any other error logging tools for further investigation
         */
       logger.err(error);
      HttpResponse.error(res,HttpStatusCode.INTERNAL_SERVER_ERROR, 'Internal server error', HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

async function getUserCounts(req:Request ,   res:Response) {
  try {

      const users = await userModel.getTotalUsersCount();
      HttpResponse.success(res, HttpStatusCode.OK, 'Total number of users', users);
  } catch (error) {
      /***Write error into files, send to channel for alerts or
       * any other error logging tools for further investigation
       */
     logger.err(error);
    HttpResponse.error(res,HttpStatusCode.INTERNAL_SERVER_ERROR, 'Internal server error', HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
}
async function getUserById(req:Request ,   res:Response) {
  try {
    const userDetails = await userModel.getUserById(req.params.id as unknown as number);
    if(userDetails){
      HttpResponse.success(res, HttpStatusCode.OK, 'User retrieved successfully', userDetails);}
      else{
        HttpResponse.error(res, HttpStatusCode.NOT_FOUND, 'No user found with provided id', HttpStatusCode.NOT_FOUND);
      }
  } catch (error) {
    logger.err(error);
    HttpResponse.error(res,HttpStatusCode.INTERNAL_SERVER_ERROR, 'Internal server error', HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
}
export default { addUser, getAllUsers,getUserCounts, getUserById } as const;