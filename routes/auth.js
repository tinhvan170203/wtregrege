const express = require('express');

const router = express.Router();

const auth = require('../controllers/auth');
const middlewareController = require('../middlewares/verifyToken');
const authmobile = require('../controllers/authmobile');
// const middlewareController = require('../middlewares/verifyToken');

router.post('/login', auth.login )
router.post('/mobile/login', authmobile.login )
router.post('/change-pass', auth.changePassword )
router.post('/mobile/change-pass', authmobile.changePassword )
router.get('/logout',  middlewareController.verifyToken, auth.logout)
router.post('/mobile/logout',  authmobile.logout)
router.get('/user/fetch',  middlewareController.verifyToken,  auth.getUserList)
router.get('/report/fetch',  middlewareController.verifyToken,  auth.fetchBaocao)
router.post('/mobile/report/add',  authmobile.addReport)


router.post('/user/add', middlewareController.verifyToken,  auth.addUser)
router.delete('/user/delete/:id',middlewareController.verifyToken,  auth.deleteUser)
router.put('/user/edit/:id', middlewareController.verifyToken,   auth.editUser)


module.exports = router