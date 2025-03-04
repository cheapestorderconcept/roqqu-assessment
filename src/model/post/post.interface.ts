
import joi  from 'joi';


export interface IPost  {
  title:string
  body:string
  userId:number
}

const PostSchema = joi.object<IPost>({
    title: joi.string().required().min(3),
    body: joi.string().required().min(5),
    userId: joi.number().required()
});

const PostQueryParam = joi.object({
    userId: joi.number().required()
})

export  {PostSchema, PostQueryParam};