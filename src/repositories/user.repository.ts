import db from "../db";
import User from "../models/user.model";

db

class UserRepository{

    async findAllUsers(): Promise<User[]> {
        const query = `
            SELECT uuid, username
            FROM app_users
        `;
        
        const {rows} = await db.query<User>(query);
        return rows || [];
    }

    async findById(uuid : string): Promise<User>{
        const query = `
            SELECT uuid, username
            FROM app_users
            WHERE uuid = $1
        `;
        const values = [uuid];
        const {rows} = await db.query<User>(query, values);
        const [user] = rows;

        return user;
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