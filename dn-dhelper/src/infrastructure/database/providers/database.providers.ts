import { Provider } from "@nestjs/common";
import { DatabaseDiTokens } from "../di/database-tokens.di";
import { DataSource } from "typeorm";
import { User } from "src/user/entities/user.entity";

export const databaseProviders: Array<Provider>  = [
    {
        provide: DatabaseDiTokens.MySQLDataSource,
        useFactory: () => {
            console.log(process.env.MYSQL_HOST);
            console.log(process.env.MYSQL_PASSWORD);
    
            const dataSource: DataSource = new DataSource({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: parseInt(process.env.MYSQL_PORT),
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DB_NAME,
                entities: [
                    User
                ],
                synchronize: true,
                logging: process.env.NODE_ENV === 'development',
            });

            return dataSource.initialize();
        }
    }
]