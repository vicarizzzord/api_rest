import { AppDataSource } from "../db";
import DatabaseError from "../models/errors/database.errors.model";
import User, { UserModel } from "../models/user.model";


class UserRepository{

    async findAllUsers(): Promise<UserModel[]> {
        try {
            return AppDataSource.getRepository(UserModel).find();    
        } catch (error) {
            throw error;
        }
        
    }

    async findById(id : string): Promise<UserModel | null>{
        try {
            return AppDataSource.getRepository(UserModel).findOne( { where: { id }});    
        } catch (error) {
            throw error;
        }
        
    }

    async update(user : User): Promise<void>{
        const script = `
            INSERT INTO app_users(
                username,
                password
            )
            VALUES ($1, crypt($2, 'my_salt'))
            RETURNING uuid
        `;

        const values = [user.username, user.password];

        await db.query(script, values);
    }

    async create(user : User): Promise<string>{
        const script = `
            UPDATE app_users
            SET
                username = $1,
                password = $2
            WHERE uuid = $3         
        `;

        const values = [user.username, user.password, user.uuid];

        const {rows} = await db.query<{uuid : string}>(script, values);
        const [newUser] = rows;
        return newUser.uuid;
    }

    async remove(uuid: string): Promise<void>{
        const script = `
        DELETE
        FROM app_users
        WHERE uuid = $1
        `;

        const values = [uuid];
        await db.query(script, values)
    }

}

export default new UserRepository();