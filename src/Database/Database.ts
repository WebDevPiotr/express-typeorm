import { Connection, createConnection, ObjectType } from 'typeorm'

class Database {

    private static connection: Connection

    public static async init() {
        this.connection = await createConnection(process.env.NODE_ENV)
    }

    public static getConnection() {
        return this.connection
    }

    public static getRepository<Entity>(target: ObjectType<Entity>) {
        return this.connection.getRepository(target)
    }
}

export default Database