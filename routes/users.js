const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(JSON.stringify({users},null,4))
});

// GET users with a particular Last Name eg. 'Smith'
router.get("/lastName/:lastName",(req,res)=>{
    const lastName = req.params.lastName;
    let filtered_lastname = users.filter((user) => user.lastName === lastName);
    res.send(filtered_lastname);
});

function getDateFromString(strDate) {
    let [dd,mm,yyyy] = strDate.split('-')
    return new Date(yyyy+"/"+mm+"/"+dd);
}
    
// console.log(sorted_users);
router.get("/sort",(req,res)=>{
    let sorted_users=users.sort(function(a, b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
            return d1-d2;
          });
    res.send(sorted_users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  let filUsers = users.filter((user) => user.email === email);
  res.send(filUsers)
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  users.push({"firstName": req.query.firstName, "lastName": req.query.lastName, "email": req.query.email, "DOB": req.query.DOB});
  res.send("User " + (req.query.firstName)+ " has been added!")
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    const email = req.params.email;
    let filUsers = users.filter((user) => user.email === email);
    if (filUsers.length > 0){
        let filUser = filUsers[0];
        let DOB = req.query.DOB;
        let firstName = req.query.firstName;
        let lastName = req.query.lastName;
        if(DOB){
            filUser.DOB = DOB;
        }
        if(firstName){
            filUser.firstName = firstName;
        }
        if(lastName){
            filUser.lastName = lastName;
        }
        users = users.filter((user) => user.email != email);
        users.push(filUser);
        res.send(`User ${email} has been updated!`)}
    else{res.send("Unable to find user!")}
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    const email = req.params.email;
    users = users.filter((user) => user.email != email);
    res.send(`User with the email  ${email} deleted.`);
});

module.exports=router;
