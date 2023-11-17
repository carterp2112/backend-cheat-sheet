import express from 'express'; //npm install express
import bodyParser from 'body-parser'; //npm install body-parser
import userRoutes from './routes/users.js'

/* 
    Install "nodemon" through 'npm install --save-dev nodemon'
    Then go to "package.json" and under "scripts" and "start" edit the value of "start" to "nodemon index.js" 
*/

const app = express();
const PORT = 5000;  

app.use(bodyParser.json());

app.use('/users', userRoutes); //Sets it so /users is the main route

app.get('/', (req, res) => {
    console.log('TEST');
    res.send('<h1>Hello from the homepage.</h1>');
});

app.listen(PORT, () => console.log(`Server Running on port : http://localhost:${PORT}`));