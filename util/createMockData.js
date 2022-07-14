const departments = require("../models/departments")

/**This Create About Five Departments */
exports.createDepartment = async () =>{
    const dep1 = {
        name: "Security",
        HOD: "NULL",
        detail:"Employee Under This Department Graud The Permises ",
        min:2
    }
    const dep2 = {
        name: "Marketing",
        HOD: "NULL",
        detail:"This Department handles Marketing of the product",
        min:0
    }
    const dep3 = {
        name: "Auditing",
        HOD: "NULL",
        detail:"This Departmnet Runs Aduiting For the Sale Per Quater",
        min:0
    }
    const dep4 = {
        name: "Health",
        HOD: "NULL",
        detail:"This Department runs the clinic in the building",
        min:0
    }
    const dep5 = {
        name: "Sales",
        HOD: "NULL",
        detail:"This Department Monitor and sale our service",
        min:1
    }
    const dep6 = {
        name: "Legals",
        HOD: "NULL",
        detail:"This Deparment Handles Legal Documents",
        min:1
    }


  await  departments.findOne({
        name : dep1.name
    }).then(data => {
        if(!data){
            departments.create(dep1)
            console.log(dep1.name + "Created");
        }
    })

    await  departments.findOne({
        name : dep2.name
    }).then(data => {
        if(!data){
            departments.create(dep2)
            console.log(dep2.name + "Created");
        }
    })

    await  departments.findOne({
        name : dep3.name
    }).then(data => {
        if(!data){
            departments.create(dep3)
            console.log(dep3.name + "Created");
        }
    })

    await  departments.findOne({
        name : dep4.name
    }).then(data => {
        if(!data){
            departments.create(dep4)
            console.log(dep4.name + "Created");
        }
    })

    await  departments.findOne({
        name : dep5.name
    }).then(data => {
        if(!data){
            departments.create(dep5)
            console.log(dep5.name + "Created");
        }
    })

    console.log("All mock Department Created");

}