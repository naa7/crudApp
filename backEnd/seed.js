const db = require("./db");
const { Student, Campus } = require("./db/models");

const seedCampuses = [
  {
    name: "Brooklyn College",
    imageUrl:
      "https://www.brooklyn.edu/wp-content/uploads/NEWS-Default-1-Featured.jpg",
    description: "Brooklyn College Campus",
    address: "2900 Bedford Ave, Brooklyn, NY 11210",
  },

  {
    name: "City College",
    imageUrl:
      "https://www.harlemonestop.com/images/organizations/1542.jpg?v=1587326290",
    description: "City College Campus",
    address: "160 Convent Ave, New York, NY 10031",
  },

  {
    name: "Queens College",
    imageUrl: "https://qns.com/wp-content/uploads/2020/11/twitter_sm-07.png",
    description: "Queens College Campus",
    address: "65-30 Kissena Blvd, Queens, NY 11367",
  },
];

const seedStudents = [
      { 
        firstName: "Mike", 
        lastName: "Dorm", 
        imageUrl: "https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/qmraJpx/videoblocks-portrait-of-male-high-school-student-standing-by-stairs-in-college-building_su_anmp97_thumbnail-1080_01.png", 
        email: "mdorm@yahoo.com", 
        gpa: 3.9,
        campusId: 1,
      },

      {       
        firstName: "Rana",   
        lastName: "Ismael",    
        imageUrl: "https://educationusa.state.gov/sites/default/files/wysiwyg/student1.jpg", 
        email: "ranaIsm@google.com", 
        gpa: 3.5,
        campusId: 2,

      },

      {     
        firstName: "Marian", 
        lastName: "Toure", 
        imageUrl: "https://4.bp.blogspot.com/-oHPSM55a0lQ/WMFIHtnbO0I/AAAAAAAAeXg/NDuF6diqXCc17wUIaMajJxzHgpKvqlBEwCLcB/w1200-h630-p-k-no-nu/Female-Black-African-Student-Smiling.jpg", 
        email: "mtoure@google.com", 
        gpa: 4.0,
        campusId: 3, //campusID must be between 1-3 because sequelize doesnt recognize numbers/keys not within that range

      },
];

const seed = async () => {
    try {
      await db.sync( { force: true }) //tells db to delete all the data and then re-sync (refresh button)
     await Campus.bulkCreate(seedCampuses);
     await Student.bulkCreate(seedStudents);
      console.log("Seeding completed successfully.");
    } catch (error) {
      console.error("Seeding failed:", error);
    }
  };
  
seed().then(() => process.exit());
