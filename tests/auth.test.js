const {calculateSalary} = require('../src/app/contollers/auth')

test('expect to add two numbers', ()=>{
    expect(calculateSalary(10)).toBe(60);
})          