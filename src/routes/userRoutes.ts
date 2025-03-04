
import UserService from '../services/user/UserService';
import { Request, Response } from 'express';



async function addUser(req: Request, res: Response) {
    
   return await UserService.addUser(req, res);
  }

  async function getAllUsers(req: Request, res: Response) {
   return await UserService.getAllUsers(req, res);
    
  }
  async function getUserCounts(req: Request, res: Response) {
    return await UserService.getUserCounts(req, res);
     
   }

   async function getUserById(req: Request, res: Response) {
    return await UserService.getUserById(req, res); 
   }

export default {
    addUser,
    getAllUsers,
    getUserCounts,
    getUserById
}