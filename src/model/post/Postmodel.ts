import db from '../../db/database';
import { IPost } from './post.interface';



async   function  createNewPost(body: IPost, userId:number): Promise<IPost | undefined> {
    try {
        const posts:IPost =   await db.table('posts').insert({...body});
        return posts;
    } catch (error) {
        console.log(error)
        throw new Error(error);
        
    }
}

async function getUserPost(userId:number){
    try {
        const posts:IPost[] = await db.table('posts').select('*').where({userId: userId});
        return posts;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

async function deletePostById(postId:number){
    try {
        const posts = await db.table('posts').delete().where('id', postId);
        return posts;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}


export default {
    createNewPost,  
    getUserPost,
    deletePostById}