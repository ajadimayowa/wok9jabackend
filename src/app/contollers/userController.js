const userSchema = require('../../../models/user');

const updateUser =async (req,res)=>{
    const {updatedData} = req.body
    const {userId} = req.params
    try {
        const updatedUser = await userSchema.findByIdAndUpdate(userId,updatedData,{new:true});
        if(!updatedUser){
            return res.status(404).json({ message: 'User not found!', success: false })
        }
        res.status(200).json({ message: 'User Updated', success: true, data: updatedGig })
        
    } catch (error) {
        res.status(400).json({ message: err.message, success: false })
    }

}

const getAUser = async ()=>{
    const {userEmail} = req.body
    try {
        const user = await userSchema.findOne({userEmail})
    } catch (error) {
        
    }
}

module.exports = {updateUser}