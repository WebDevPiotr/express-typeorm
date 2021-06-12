import { expect } from 'chai'
import User from 'User/User'
import { UserEntityRepository } from 'User/Repository/UserEntityRepository'
import UserRepository from 'User/Repository/UserRepository'
import sinon from 'sinon'
import UserEntity from 'User/Repository/User.entity'
describe('User Repository Test', () => {

    const userEntityReposotory = new UserEntityRepository()
    const userReposotory = new UserRepository(userEntityReposotory)

    const user = User.builder()
        .setFirstName('testName')
        .setLastName('testLastName')
        .setEmail('test@test.com')
        .setPassword('testPassword')
        .build()

    const savedUser = User.builder()
        .setId(1)
        .setFirstName('testName')
        .setLastName('testLastName')
        .setEmail('test@test.com')
        .setPassword('testPassword')
        .build()

    const userEntity = UserEntity.builder()
        .setId(1)
        .setFirstName('testName')
        .setLastName('testLastName')
        .setEmail('test@test.com')
        .setPassword('testPassword')
        .build()

    afterEach(() => {
        sinon.restore()
    })
    
    it('should save user', async () => {
        sinon.stub(userEntityReposotory, "save").returns(Promise.resolve(userEntity))
        const result = await userReposotory.save(user)
        expect(result).to.be.eql(savedUser)
    })

    it('should find users', async () => {
        sinon.stub(userEntityReposotory, "find").returns(Promise.resolve([userEntity]))
        const result = await userReposotory.findAll()
        expect(result).to.be.eql([savedUser])
    })

    it('should return empty array if no users', async () => {
        sinon.stub(userEntityReposotory, "find").returns(Promise.resolve([]))
        const result = await userReposotory.findAll()
        expect(result).to.be.empty
    })

    it('should find user', async () => {
        sinon.stub(userEntityReposotory, "findOne").returns(Promise.resolve(userEntity))
        const result = await userReposotory.findById(1)
        expect(result).to.be.eql(savedUser)
    })

    it('should not find user if not exist', async () => {
        sinon.stub(userEntityReposotory, "findOne").returns(undefined)
        const result = await userReposotory.findById(1)
        expect(result).to.be.undefined
    })

    it('should remove user', async () => {
        sinon.stub(userEntityReposotory, "findOne").returns(Promise.resolve(userEntity))
        sinon.stub(userEntityReposotory, "remove").returns(Promise.resolve(userEntity))
        const result = await userReposotory.removeById(1)
        expect(result).to.be.eql(savedUser)
    })

    it('should return undefined if there is no user to be removed', async () => {
        sinon.stub(userEntityReposotory, "findOne").returns(undefined)
        const result = await userReposotory.removeById(1)
        expect(result).to.be.undefined
    })

})