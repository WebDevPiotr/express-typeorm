import AppFactory from 'App/AppFactory'
import JwtToken from 'Security/JwtToken'
import Database from 'Database/Database'

import supertest from 'supertest'
import { expect } from 'chai'
import { StartedTestContainer } from 'testcontainers'
import { initDbContainer } from '../initDbContainer'
import { UserEntityRepository } from 'User/Repository/UserEntityRepository'

describe('User Controller Test', () => {

    let container: StartedTestContainer
    let request: any

    before(async () => {
        container = await initDbContainer()
        await Database.connect({
          type: "postgres",
          host: "localhost",
          port: container.getMappedPort(5432),
          username: "postgres",
          password: "postgres",
          database: "test",
          synchronize: true,
          entities: ["src/**/*.entity.ts"],
        })
        request = supertest(AppFactory.get())
        await Database.getConnection().getCustomRepository(UserEntityRepository).query(
            `INSERT INTO users (id,"firstName", "lastName", email, password) VALUES
            (1, 'Jan', 'Kowalski', 'kowalski@gmail.com', '111'),
            (2, 'Mariusz', 'Nowak', 'nowak@gmail.com', '111');`
        );
      })
    
      after(async () => {
        await Database.close()
        await container.stop()
      })

    it('should throw error if token not present', async () => {
        const response = await request.get("/users")
        expect(response.body.name).to.be.equal('Access Denied Error')
        expect(response.body.status).to.be.equal(403)
        expect(response.body.message).to.be.equal('No authorization header')
    })

    it('should throw error if token start not with Bearer', async () => {
      const response = await request.get("/users").set('Authorization', `asdasdasda`)
      expect(response.body.name).to.be.equal('Access Denied Error')
      expect(response.body.status).to.be.equal(403)
      expect(response.body.message).to.be.equal('Wrong token prefix')
  })

})