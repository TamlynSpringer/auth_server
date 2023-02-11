const express = require('express');
const router = express.Router();
const adminsController = require('../../controllers/adminController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(adminsController.getAllAdmins)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin), adminsController.createNewAdmin)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin), adminsController.updateAdmin)
    .delete(verifyRoles(ROLES_LIST.SuperAdmin), adminsController.deleteAdmin);

router.route('/:id')
    .get(adminsController.getAdmin);

module.exports = router;