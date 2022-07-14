const mongoose = require('mongoose');
const departments = require('../models/departments');

    var data = async function () {
         var array = [];
         const finalResults = await new Promise((resolve, reject) => {
            departments.find({} , function(err, result) {
              resolve(result);
           });
      });

     for(var i = 0; i < finalResults.length; i++)
     {
          var a = finalResults[i];
           array.push(a);
      }
        return array;
    };

    module.exports = {
        data: data,
    };