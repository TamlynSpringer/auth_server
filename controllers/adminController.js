const Admin = require('../model/Admin');

const getAllAdmins = async (req, res) => {
    const admins = await Admin.find();
    if (!admins) return res.status(204).json({ 'message': 'No admins found.' });
    res.json(admins);
}

const createNewAdmin = async (req, res) => {
    if (!req?.body?.email || !req?.body?.storeName) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }

    try {
        const result = await Admin.create({
            email: req.body.email,
            storeName: req.body.storeName
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateAdmin = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const admin = await Admin.findOne({ _id: req.body.id }).exec();
    if (!admin) {
        return res.status(204).json({ "message": `No admin matches ID ${req.body.id}.` });
    }
    if (req.body?.email) admin.email = req.body.email;
    if (req.body?.storeName) admin.storeName = req.body.storeName;
    const result = await admin.save();
    res.json(result);
}

const deleteAdmin = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Admin ID required.' });

    const admin = await Admin.findOne({ _id: req.body.id }).exec();
    if (!admin) {
        return res.status(204).json({ "message": `No admin matches ID ${req.body.id}.` });
    }
    const result = await admin.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getAdmin = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Admin ID required.' });

    const admin = await Admin.findOne({ _id: req.params.id }).exec();
    if (!admin) {
        return res.status(204).json({ "message": `No admin matches ID ${req.params.id}.` });
    }
    res.json(admin);
}

module.exports = {
    getAllAdmins,
    createNewAdmin,
    updateAdmin,
    deleteAdmin,
    getAdmin
}