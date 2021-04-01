import { Connection, createConnection, ObjectType } from 'typeorm'

class Database {

    private static connection: Connection

    public static async init(config?: any) {
        if (config) {
            this.connection = await createConnection(config)
            //console.log(this.connection)
        }
        else this.connection = await createConnection(process.env.NODE_ENV)
    }

    public static async close() {
        await this.connection.close()
        this.connection = null
    }

    public static getConnection() {
        return this.connection
    }

    public static getRepository<Entity>(target: ObjectType<Entity>) {
        return this.connection.getRepository(target)
    }
}

export default Database