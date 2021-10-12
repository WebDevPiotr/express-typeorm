import { expect } from 'chai'
import UserService from 'User/UserService';
import UserRepository from 'User/Repository/UserRepository';
import sinon from 'sinon';
import User from 'User/User';
import UserResponse from 'User/DTO/UserResponse';
import UserController from 'User/UserController';
import { NotFoundError } from 'routing-controllers';

describe('User Controller Test', () => {

    const userService = new UserService({} as UserRepository)
    const userController = new UserController(userService)

    const user = User.builder()
        .setId(1)
        .setFirstName('testName')
        .setLastName('testLastName')
        .setEmail('test@test.com')
        .setPassword('testPassword')
        .build()

    const user2 = User.builder()
        .setId(1)
        .setFirstName('testName2')
        .setLastName('testLastName2')
        .setEmail('test@test2.com')
        .setPassword('testPassword2')
        .build()

    afterEach(() => {
        sinon.restore()
    })

    it('should return empty array if no users', async () => {
        sinon.stub(userService, "findAll").returns(Promise.resolve([]))
        const result = await userController.findAll()
        expect(result).to.be.empty
    })

    it('should return users', async () => {
        sinon.stub(userService, "findAll").returns(Promise.resolve([user, user2]))
        const result = await userController.findAll()
        expect(result).to.be.eql([user, user2].map(user => UserResponse.fromUser(user)))
    })

    it('should find user', async () => {
        sinon.stub(userService, "findById").withArgs(1).returns(Promise.resolve(user2))
        const result = await userController.findById(1)
        expect(result).to.be.eql(UserResponse.fromUser(user2))
    })

    it('should throw error if user not exist', async () => {
        sinon.stub(userService, "findById").withArgs(1).throws(new NotFoundError('User not found'))
        expect(userController.findById(1)).to.be.rejectedWith(new NotFoundError('User not found'))
    })

})