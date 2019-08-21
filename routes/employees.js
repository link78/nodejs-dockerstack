var express = require('express');
var router = express.Router();
var employeeController = require('../controller/EmployeeController.js');

/* GET home page. */
router.get('/', employeeController.list);

router.get('/get_one/:id', employeeController.get_one);

router.get('/create', employeeController.create);

router.post('/save', employeeController.save);

router.get('/edit/:id', employeeController.edit);

router.post('/update/:id', employeeController.update);

router.post('/delete/:id', employeeController.delete);

module.exports = router;
