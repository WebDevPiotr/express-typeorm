import Database from 'Database/Database'
import UserEntity from 'User/Repository/User.entity'

import { expect } from 'chai'
import { StartedTestContainer } from 'testcontainers'
import { initDbContainer, config } from '../mockDatabase'
import { UserEntityRepository } from 'User/Repository/UserEntityRepository'
import { getCustomRepository } from 'typeorm'

describe('User Database Test', () => {

  let container: StartedTestContainer
  let userReposotory: UserEntityRepository

  before(async () => {
    container = await initDbContainer()
    await Database.connect({
      ...config,
      port: container.getMappedPort(5432),
    })
    userReposotory = getCustomRepository(UserEntityRepository, 'test');
  })

  after(async () => {
    await Database.close()
    await container.stop()
  })

  it('should save user', async () => {
    const user = UserEntity.builder()
      .setFirstName('testName').setLastName('testLastName')
      .setEmail('test@test.com').setPassword('testPassword')
      .build()
    await userReposotory.save(user)
    const savedUser = await userReposotory.findOne({ id: user.id })

    expect(savedUser.firstName).to.be.equal('testName')
    expect(savedUser.lastName).to.be.equal('testLastName')
    expect(savedUser.email).to.be.equal('test@test.com')
    expect(savedUser.password).to.be.equal('testPassword')
  })

  it('should update user', async () => {
    const user = UserEntity.builder()
      .setFirstName('testName').setLastName('testLastName')
      .setEmail('test@test.com').setPassword('testPassword')
      .build()
    await userReposotory.save(user)
    const newUserData = UserEntity.builder()
      .setId(user.id)
      .setFirstName('testName2').setLastName('testLastName2')
      .build()
    await userReposotory.save(newUserData)

    const savedUser = await userReposotory.findOne(user.id)
 
    expect(savedUser.id).to.be.equal(user.id)
    expect(savedUser.firstName).to.be.equal('testName2')
    expect(savedUser.lastName).to.be.equal('testLastName2')
    expect(savedUser.email).to.be.equal('test@test.com')
    expect(savedUser.password).to.be.equal('testPassword')
  })

  it('should delete user', async () => {
    const user = UserEntity.builder()
      .setFirstName('testName').setLastName('testLastName')
      .setEmail('test@test.com').setPassword('testPassword')
      .build()
    await userReposotory.save(user)
    const id = user.id
    await userReposotory.remove(user)
    const savedUser = await userReposotory.findOne({ id })
    expect(savedUser).to.be.undefined
  })

})