var express = require('express');
var router = express.Router();
const controller = require('../controllers/staff')
const passport = require('passport');
const upload = require('../middleware/upload')
const checkUser = require("../middleware/checkstaus")

/* GET users listing. */
router.get('/', checkUser,controller.getIndex);
// Auth
router.get('/login', controller.getLogin);
router.get('/forgot', controller.getForgot);
router.post('/forgot', controller.postForgot);
// Requesting for a leave Form 
router.get('/request', checkUser,controller.getRequests);
router.post('/request', checkUser, upload.array('image',12),controller.postRequests);
// leave el...
router.get('/eligibles', checkUser,controller.getEligible);
router.get('/notifications', checkUser,controller.getNotfication);
router.get('/notifications/:id', checkUser,controller.getOneNotfication);
router.get('/staffs', checkUser,controller.getIndex);
router.get('/profile', checkUser,controller.getProfile);
router.get('/end', checkUser,controller.getEnd);
router.post('/end', checkUser,controller.postEnd);
router.get('/departments', checkUser,controller.getDepartment);
router.get('/del/dep/:id', checkUser,controller.delDep);
router.get('/edit/dep/:id', checkUser,controller.getEditDepartment);
router.post('/edit/dep/:id', checkUser,controller.postEditDepartment);
router.get('/dep/staff/:id', checkUser,controller.getDepartment);
router.get('/active', checkUser,controller.getIndex);
router.get('/history', checkUser,controller.getHistory);
router.get('/history/:id', checkUser,controller.getOneHistory);
router.get('/mydata.csv', checkUser,controller.getCvs);
router.get('/create-staff', checkUser,controller.getCreateStaff);
router.get('/create-department', checkUser,controller.getCreateDepartment);

router.post('/create-staff', checkUser,controller.postCreateStaff)
router.post('/create-Department', checkUser,controller.postCreateDepartment)

router.post('/login',passport.authenticate('local', { failureRedirect: '/staff/login', successRedirect: '/staff' }));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/staff/login');
});


module.exports = router;