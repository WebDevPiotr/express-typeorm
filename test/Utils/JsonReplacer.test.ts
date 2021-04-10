import JsonReplacer from 'Utils/JsonReplacer'

describe('Json Replacer Test', () => {

    it('Remove password field', () => {
        const result = JSON.parse(JSON.stringify(userWithPassword, JsonReplacer))
        expect(result).toEqual(user)
    })

})

const user = {
    firstName: "John",
    lastName: "Bravo",
    email: 'john@gmail.com',
}
const userWithPassword = {
    ...user,
    password: "111",
}