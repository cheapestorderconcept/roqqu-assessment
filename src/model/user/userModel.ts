import { DbTableName } from '../../common/constants';
import db from '../../db/database';
import { IUser, IUserWithAddressDetails, OffsetPagination } from './user.interface';


async  function createNewUser(body:IUser, id:number): Promise<IUser | undefined> {
   try {

const newUser: IUser = {
    ...body
};
await db.table(DbTableName.USER).insert({...newUser, id});
return newUser;
   } catch (error) {
    console.log(error)
    return undefined;
   }
}

async function getUser(paginationDto: OffsetPagination){
    try {
    const { pageNumber = 1, pageSize = 10 } = paginationDto;
    const offset = (pageNumber - 1) * pageSize;
    const users = await db.table(DbTableName.USER).select('*').offset(offset).limit(pageSize);
    return users;
    } catch (error) {
     console.log(error)
     throw new Error(error);
    }
}

async function getTotalUsersCount(){
    try{
     const userCount= await db.table(DbTableName.USER).count('*  as userCount');
    return userCount[0];
    }catch(error){
     console.log(error)
     throw new Error(error);
    }
}
async function getUserById(id: number): Promise<IUserWithAddressDetails | undefined> {
    try{
        const [user, address] = await Promise.all([
            db.table(DbTableName.USER).select('*').where('id', id).first(),
            db.table(DbTableName.ADDRESS).select('*').where('userId', id).first()
        ]
          
        )
        if (user) {
            user.address = {
                ...address
            }
        }
        return user;
    }catch(error){
        console.log(error)
        throw new Error(error);
    }
}
export default {
    createNewUser, 
    getUser, 
    getTotalUsersCount, 
    getUserById
} as const