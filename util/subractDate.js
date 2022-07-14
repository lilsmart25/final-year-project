/**Get Day Diffent
 * @param {Date} date1 this is the date the leave start
 * @param {Date}date2 this is the date the leaves end
 * @returns this return a Number Value
  */
exports.getDiff = (date1, date2)=>{
    const D1 = new Date(date1);
    const D2 = new Date(date2);
    const diffTime = Math.abs(D2 - D1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays
}