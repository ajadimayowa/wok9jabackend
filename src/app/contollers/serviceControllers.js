const ServiceModel = require('../../../models/service')

const createService = async (req, res) => {
    const { title, description, icon,createdBy } = req.body;
    const newService = new ServiceModel({
        title,
        description,
        icon,
        createdBy,
        providers: [],
        basic: true,
        category: 'General'
    });

    try {
        await newService.save();
        return res.status(200).json({ message: 'Service Created', success: true, status: 200 });
    } catch (err) {
        return res.status(400).json({ message: err.message, success: false });
    }
};

const getAllServices = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;

    try {
        const services = await ServiceModel
            .find({})
            .limit(limit * 1) // Convert limit to a number and set the limit
            .skip((page - 1) * limit) // Skip the previous pages' services
            .exec();

        const count = await ServiceModel.countDocuments(); // Get the total number of services

        return res.status(200).json({
            services,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            totalItems: count,
            success: true,
            status: 200
        });
    } catch (err) {
        return res.status(500).json({ message: err.message, success: false });
    }
};

const getService = async (req, res) => {
    const { id } = req.params;

    try {
        const service = await ServiceModel.findById(id);
        if (!service) {
            return res.status(404).json({ message: 'Service Not Found', success: false });
        }
        return res.status(200).json({ service, success: true, status: 200 });
    } catch (err) {
        return res.status(500).json({ message: err.message, success: false });
    }
};

const updateService = async (req, res) => {
    const { id } = req.params;
    const { title, description, icon, providers, basic, category } = req.body;

    try {
        const updatedService = await ServiceModel.findByIdAndUpdate(
            id,
            { title, description, icon, providers, basic, category },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Service Not Found', success: false });
        }

        return res.status(200).json({ message: 'Service Updated', service: updatedService, success: true });
    } catch (err) {
        return res.status(500).json({ message: err.message, success: false });
    }
};

const deleteService = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedService = await ServiceModel.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ message: 'Service Not Found', success: false });
        }

        return res.status(200).json({ message: 'Service Deleted', success: true });
    } catch (err) {
        return res.status(500).json({ message: err.message, success: false });
    }
};

module.exports = {createService,getAllServices,getService,updateService,deleteService}