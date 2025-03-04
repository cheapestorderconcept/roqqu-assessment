import { Request, Response } from 'express';
import PostService from '../services/post/PostService';

async function createNewPost(req:Request, res: Response){
    return await PostService.createNewPost(req, res);
}

async function getAllUserPostById(req:Request, res: Response){
    return await PostService.getAllUserPostById(req, res);
}

async function deletePostById(req:Request
    , res: Response){
    return await PostService.deletePostById(req, res);
}

export default {
    createNewPost,
    getAllUserPostById,
    deletePostById  
}