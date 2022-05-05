import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AppDataSource } from '../db';

@Entity()
class UserModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({
        length: 100
    })
    username!: string

    @Column("text")
    password!: string
}


type User = {
    uuid?: string;
    username: string;
    password?: string;
}


const user = AppDataSource;
export { UserModel };
export default User;