const users = require("../models/user")

/**This Funtion Send a mail to the new Admin and change state to new ....
 * This is Used For Update
 * @param {String} name - this is name used to register the user and what would be used to sort the user 
 */

exports.module =async (name)=>{
    const user =await users.findOne({
        name : name
    })

    

}