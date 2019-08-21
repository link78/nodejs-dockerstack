const mongoose = require ('mongoose');
var Employee = require('../models/EmployeeModels');

var employeeController = {};


employeeController.list = function(req, res) {
    Employee.find({})
    .exec((err, employees)=> {
        if(err) {
            console.log('Error ocuurs');
        }else {
            res.render('index',{employees:employees});
        }
    });
};


employeeController.get_one = function(req, res) {
    Employee.findOne({_id:req.params.id})
    .exec((err, employee)=> {
        if(err) {
            console.log("Error occurs");
        }else {
            res.render("get_one",{employee:employee});
        }
    });
};


employeeController.create = function(req, res) {
    res.render("create");
};

employeeController.save = function(req, res) {
    var employee = new Employee(req.body);

    employee.save(function(err){
        if(err) {
            console.log(err);
            res.render("create");
        }else {
            res.redirect("/get_one/"+ employee._id);
        }
    });
}

employeeController.edit = function(req, res) {
    Employee.findOne({_id:req.params.id})
    .exec((err, employee)=> {
        if(err) {
            console.log("Error occurs");
        }else {
            res.render("edit",{employee:employee});
        }
    });
};

employeeController.update = function(req, res) {
    Employee.findByIdAndUpdate(req.params.id,{ $set: {name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary}},
        {new:true}, function(err, employee){
            if(err){
                console.log("Error occurs");
                res.render("edit",{employee: req.body});
            }
                res.redirect('/get_one/'+ employee._id);
            
        });
};

employeeController.delete = function(req, res) {
    Employee.findOne({_id:req.params.id})
    .exec((err, employee)=> {
        if(err) {
            console.log("Error occurs");
        }else {
            res.redirect("index",{employee:employee});
        }
    });
};

module.exports= employeeController;