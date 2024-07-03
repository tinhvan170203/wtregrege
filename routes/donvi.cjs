const express = require('express');

const router = express.Router();
const middlewareController = require('../middlewares/verifyToken.cjs');
const donvi = require('../controllers/donvi.cjs');

router.get('/fetch',middlewareController.verifyToken, donvi.getDonvis);
router.get('/fetch/active',middlewareController.verifyToken, donvi.getDonvisActive);
router.post('/add',middlewareController.verifyToken, donvi.addDonvi);
router.put('/edit/:id',middlewareController.verifyToken, donvi.updateDonvi);
router.delete('/delete/:id',middlewareController.verifyToken, donvi.deleteDonvi);


module.exports = router
