let otpGenerator = () => {
    let otp = [];
    for (let x = 0; x < 6; x++) {
        let number = Math.floor(Math.random()  * 10)
        otp.push(number)
    }
    return otp.toString()
}

module.exports = otpGenerator;