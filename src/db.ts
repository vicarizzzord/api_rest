import { DataSource } from "typeorm";
import { UserModel } from "./models/user.model";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    schema: "users",
    entities: [
        UserModel
    ],
    synchronize: true,
    logging: true,
});

const database = async () => {
    try{
        await AppDataSource.initialize();
        console.log("Database connection established successfully");
    } catch (error) {
        console.log("Database connection not established", error);
        throw error;
    }
    
};

export { AppDataSource, database };

