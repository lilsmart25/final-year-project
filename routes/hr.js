var express = require('express');
var router = express.Router();
const controller = require('../controllers/hr')
const passport = require('passport');
const superUser = require("../middleware/isSuperUser")

/* GET users listing. */
router.get('/', superUser,controller.getIndex);
router.get('/sync',controller.getSync)
router.get('/login', controller.getLogin);
router.get('/requests', superUser,controller.getRequests);
router.get('/request/:id/:user', superUser,controller.getRequest);
router.get('/end/request/:id/:user', superUser,controller.getDeny);
router.post('/request/:id', superUser,controller.postRequest);
router.get('/staffs', superUser,controller.getStaffs);
router.get('/departments', superUser,controller.getDepartment);
router.get('/del/dep/:id', superUser,controller.delDep);
router.get('/edit/dep/:id', superUser,controller.getEditDepartment);
router.post('/edit/dep/:id', superUser,controller.postEditDepartment);
router.get('/dep/staff/:id', superUser,controller.getDepartment)
router.get('/edit/staff/:id', superUser,controller.getEditStaff);
router.post('/edit/staff/:id', superUser,controller.postEditStaff);;
router.get('/del/staff/:id', superUser,controller.delStaff);
router.get('/active', superUser,controller.getAStaffs);
router.get('/history', superUser,controller.getHistory);
router.get('/history/:id', superUser,controller.getOneHistory);
router.get('/csv', superUser,controller.getCvs);
router.get('/create-staff', superUser,controller.getCreateStaff);
router.get('/create-department', superUser,controller.getCreateDepartment);

router.post('/create-staff', superUser,controller.postCreateStaff)
router.post('/create-Department', superUser,controller.postCreateDepartment)

router.post('/login',passport.authenticate('local', { failureRedirect: '/hr/login', successRedirect: '/hr' }));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/hr/login');
});


module.exports = router;
