const Student = require("./student.js");
const Campus = require("./campus.js");

// Our Associations: one-to-many
 Campus.hasMany(Student, { foreignKey: "campusId", onDelete: "CASCADE" }); 
Student.belongsTo(Campus, { foreignKey: "campusId" });  //causes an extra campusID column thats not being used
//Campus.hasMany(Student, {onDelete: "CASCADE" }); 
//Student.belongsTo(Campus) //when you do hasMany or belongTo sequqleize automatically creates a 
                          //foreign key, we may be overriding, no need to manually write 
  
module.exports = {
  Student,
  Campus,
};
