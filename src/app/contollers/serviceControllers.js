const serviceModel = require('../../../models/service')

const createNewService = async (req, res) => {
    const {title,description,}=req.body
    const newService = new serviceModel({
        title: title,
        description: description,
        providers: [],
        basic: true,
        category: 'General'
    })

    await newService.save().then(() => {
        res.status(200).json({ message: 'Service Created', success: true, status: 200 })
    }).catch(err => res.status(401).json({ message: err, success: false }));


}

module.exports = {createNewService}