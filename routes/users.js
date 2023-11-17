import express from 'express';
import { v4 as uuidv4 } from 'uuid'; //npm install uuid


const router = express.Router();

let users = []

//All routes in here start with "/users"
router.get('/', (req, res) => {
    res.send(users);
    console.log("GET users reached.")
});

router.post('/', (req, res) => {
    console.log("POST route reached.")
    const user = req.body;
    const userID = uuidv4()

    const userWithID = { ...user, id: userID };

    users.push(userWithID);

    res.send(`User with name ${user.firstName} ${user.lastName}, with ID: ${userID} added to database.`);
});

router.get('/:id', (req, res) => {
    console.log("GET ID sent.")
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);
    res.send(foundUser);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log("DELETE ID performed.");

    users  = users.find((user) => user.id != id);

    res.send(`User with ID:${id} deleted from users.`);
})

router.patch('/:id', (req, res) => { //Difference between PUT and PATCH is that PUT replaces whole obj while PATCH replaces varaible
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    console.log("PATCH request received.")

    const userToBeUpdated = users.find((user) => user.id === id);

    if (firstName) {
        userToBeUpdated.firstName = firstName;
    }

    if (lastName) {
        userToBeUpdated.lastName = lastName;
    }

    if (age) {
        userToBeUpdated.age = age;
    }

    res.send(`User with the ID:${id} has been updated.`)
});

export default router;