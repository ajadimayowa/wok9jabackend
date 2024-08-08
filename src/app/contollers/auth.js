const userModel = require('../../../models/user');
const bcrypt = require('bcrypt')


function calculateSalary(salary) {
    let income = 10
    let profit = 50
    return profit + income
}

function calculateInterest(salary, numDays) {
    let interest = salary * numDays
    return interest
}

const signUpController = async (req, res) => {
    const {fullName,userName,password,email,}=req.body
    try {

        let user = await userModel.findOne({ $or: [{ email }, { userName }] });
        if (user) {
            return res.status(409).json({ message: 'User exist', success: false, code: 409 })
        }
        if (!user) {
            let pword = bcrypt.hash(req.body,10)
            let newUser = new userModel({
                fullName,
                email,
                userName,
                isVerified:false,
                phoneNumber
            })
        }

    } catch (error) {

    }

}

module.exports = { calculateSalary, calculateInterest }

