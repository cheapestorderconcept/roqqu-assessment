import { Router } from 'express';
import userRoutes from './userRoutes';
import addressRoutes from './addressRoutes';
import postRoutes from './postRoutes';
import apiPaths from '../common/apiPaths';
import { validateRequest,  } from '../utils/middlewares';
import {PostSchema,PostQueryParam} from "../model/post/post.interface";
import { User , Id, paginationDto} from "../model/user/user.interface";
import {AddressSchema, UpdateaddressSchema,UserIdValidation} from '../model/address/address.interface';
const apiRouter = Router();
const userRouter = Router();
const addressRouter = Router();
const postRouter = Router();
/****User routes */
userRouter.post(apiPaths.Users.Add, validateRequest(User),validateRequest(Id, 'params'),userRoutes.addUser);
userRouter.get(apiPaths.Users.Get,validateRequest(paginationDto, 'query'),userRoutes.getAllUsers);
userRouter.get(apiPaths.Users.count,userRoutes.getUserCounts);
userRouter.get(apiPaths.Users.getById,validateRequest(Id, 'params'),userRoutes.getUserById);
apiRouter.use(apiPaths.Users.Base, userRouter);

/****Address routes */
addressRouter.post(apiPaths.Addresses.add,validateRequest(AddressSchema),addressRoutes.createNewAddress);
addressRouter.patch(apiPaths.Addresses.update,validateRequest(UpdateaddressSchema),addressRoutes.updateAddress);
addressRouter.get(apiPaths.Addresses.getById,validateRequest(UserIdValidation,'params') ,addressRoutes.getAddressByUserId);
apiRouter.use(apiPaths.Addresses.Base, addressRouter);

/**Posts routes ***/
postRouter.post(apiPaths.Posts.add,validateRequest(PostSchema),postRoutes.createNewPost);
postRouter.get(apiPaths.Posts.Get,validateRequest(PostQueryParam,'query'),postRoutes.getAllUserPostById);
postRouter.delete(apiPaths.Posts.delete,validateRequest(Id,'params'),postRoutes.deletePostById);
apiRouter.use(apiPaths.Posts.Base, postRouter);
export  default apiRouter;