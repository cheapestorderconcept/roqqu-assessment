import Postmodel from "../../model/post/Postmodel";
import { Request, Response } from 'express';
import HttpResponse from '../../utils/httpsResponse';
import HttpStatusCode from '../../common/HttpStatusCode';
import logger from 'jet-logger';
import { IPost } from "@src/model/post/post.interface";
import userModel from "../../model/user/userModel";
async function createNewPost(req: Request, res: Response) {
  try {
    const  body = req.body;
    const userId: number = req.body.userId as unknown as  number;
    const user = await userModel.getUserById(userId as unknown as number);
    if (!user) {
    /***prevent creation of post if user doesn't exist*/
     HttpResponse.error(res,HttpStatusCode.BAD_REQUEST, 'No user is with provided id', 400);
     return;
    }
    const newPost = await Postmodel.createNewPost(body, userId);
    if (newPost) {
       HttpResponse.success(res, HttpStatusCode.CREATED, 'Post created successfully', newPost);
    }else{
      HttpResponse.error(res,HttpStatusCode.INTERNAL_SERVER_ERROR, 'An error occured', 500);
    }
  } catch (error) {
    logger.err(error);
    HttpResponse.error(res,HttpStatusCode.INTERNAL_SERVER_ERROR, 'Internal server error', 500);
  }
}

async function  getAllUserPostById( req: Request, res: Response) {
  try {
    const userId: number = req.query.userId as unknown as number;
    const posts:IPost[] = await Postmodel.getUserPost(userId);

    if (posts.length>0) {
      HttpResponse.success(res, HttpStatusCode.OK, 'Posts retrieved successfully', {posts});
    }else{
     HttpResponse.success(res, HttpStatusCode.OK, 'You currently have no post', {posts});
    }
  } catch (error) {
    logger.err(error);
    HttpResponse.error(res,HttpStatusCode.INTERNAL_SERVER_ERROR, 'Internal server error', 500);
  }

}

async function deletePostById(req: Request, res: Response) {
    try {
        const postId: number = req.params.id as unknown as number;
        const post = await Postmodel.deletePostById(postId);
        if (post) {
            HttpResponse.success(res, HttpStatusCode.OK, 'Post deleted successfully', {post});
        }else{
         HttpResponse.error(res,HttpStatusCode.INTERNAL_SERVER_ERROR, 'An error occured', 500);
        }
    } catch (error) {
        logger.err(error);
        HttpResponse.error(res,HttpStatusCode.INTERNAL_SERVER_ERROR, 'Internal server error', 500);
    }
}

export default {
    createNewPost,
    getAllUserPostById,
    deletePostById
}