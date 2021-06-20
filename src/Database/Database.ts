import { Connection, createConnection } from 'typeorm'
class Database {

    private static connection: Connection

    public static async connect(config?: any) {
        if (config) this.connection = await createConnection(config)
        else this.connection = await createConnection(process.env.NODE_ENV)
    }

    public static async close() {
        await this.connection.close()
        this.connection = null
    }

    public static getConnection() {
        return this.connection
    }

}

export default Database