
require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require("./db");
let log = require('./controllers/workoutlogcontroller');
let user = require('./controllers/usercontroller');
app.use(require("./middleware/headers"));

sequelize.sync();
//sequelize.sync({force: true})

app.use(express.json());

//app.user(require('./middleware/validate-session'));
app.use('/user', user);
app.use('/log', log);


app.listen(3000, function(){
    console.log('App is listening on port 3000');
})