import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import User from 'User/User'
import UserRepository from 'User/Repository/UserRepository'
import sinon from 'sinon'
import UserService from 'User/UserService'
import UserResponse from 'User/DTO/UserResponse'
import { UserEntityRepository } from 'User/Repository/UserEntityRepository'
import UserRequest from 'User/DTO/UserRequest'
import NotFoundException from 'Errors/exceptions/NotFoundException'
import BadRequestException from 'Errors/exceptions/BadRequestException'

chai.use(chaiAsPromised)
describe('User Service Test', () => {

    const userReposotory: UserRepository = new UserRepository({} as UserEntityRepository)
    const userService = new UserService(userReposotory)

    const request: UserRequest = {
        firstName: 'testName',
        lastName: 'testLastName',
        email: 'test@test.com',
        password: 'testPassword'
    }

    const user = User.builder()
        .setId(1)
        .setFirstName('testName')
        .setLastName('testLastName')
        .setEmail('test@test.com')
        .setPassword('testPassword')
        .build()
    
    const response = UserResponse.fromUser(user)

    afterEach(() => {
        sinon.restore()
    })

    it('should save user', async () => {
        sinon.stub(userReposotory, "findByEmail").returns(undefined)
        sinon.stub(userReposotory, "save").returns(Promise.resolve(user))
        const result = await userService.save(request)
        expect(result).to.be.eql(response)
    })

    it('should throw error on save if user already exist', async () => {
        sinon.stub(userReposotory, "findByEmail").returns(Promise.resolve(user))
        expect(userService.save(request)).to.be.rejectedWith(new BadRequestException('User with provided email already exist'))
    })

    it('should find users', async () => {
        sinon.stub(userReposotory, "findAll").returns(Promise.resolve([user]))
        const result = await userService.findAll()
        expect(result).to.be.eql([response])
    })

    it('should return empty array if no users', async () => {
        sinon.stub(userReposotory, "findAll").returns(Promise.resolve([]))
        const result = await userService.findAll()
        expect(result).to.be.empty
    })

    it('should find user', async () => {
        sinon.stub(userReposotory, "findById").withArgs(1).returns(Promise.resolve(user))
        const result = await userService.findById(1)
        expect(result).to.be.eql(response)
    })

    it('should throw error if user not exist', async () => {
        sinon.stub(userReposotory, "findById").returns(undefined)
        expect(userService.findById(1)).to.be.rejectedWith(new NotFoundException('User not found'))
    })

    it('should remove user', async () => {
        sinon.stub(userReposotory, "removeById").returns(Promise.resolve(user))
        await userReposotory.removeById(1)
        expect(userReposotory.removeById(1)).to.not.be.rejected
    })

    it('should throw error if there is no user to be removed', async () => {
        sinon.stub(userReposotory, "removeById").returns(Promise.resolve(user))
        await userReposotory.removeById(1)
        expect(userReposotory.removeById(1)).to.be.rejectedWith(new NotFoundException('User not found'))
    })

})