let otpGenerator = () => {
    let otp = Math.floor(Math.random() * 1000000)
    return otp
}

module.exports = otpGenerator;