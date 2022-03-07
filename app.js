// Imports
import {sql} from '../RESTAPI/sql.js'
import express from 'express';
import {lengthCheck} from "./check.js";
import * as path from "path";

// Basic const
const db = new sql();
const app = express();
const port = 3000;
const urlencodedParser = express.urlencoded({extended: false});
const __dirname = path.resolve();

// Function

// Static Files
app.use(urlencodedParser);
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));


// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');


// Get state
app.get('/', (req, res) => {
    res.render('mainpage', { title: 'Home',text: 'This is EJS',active:"home"});
})
app.get('/register', (req, res) => {
    res.render('index', { title: 'Registration',text: 'This is EJS',active:"register",errorDiscription:null});
})
app.get('/about', (req, res) => {
    res.render('about', { title: 'About',text: 'About Page',active:"about"});
});
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login',text: 'Login Page',active:"login",errorDiscription:null});
});
app.get('/study', (req, res) => {
    //Test words and desc
    var words = ['First_1','Second','Third','Four','Five','Six'];
    var desc = ['First','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac laoreet sapien. Curabitur neque erat, elementum ac rutrum dapibus, ultricies ac lacus. Etiam luctus maximus lacus, in congue est posuere sed. Vestibulum id rutrum elit, id tincidunt nibh. Ut a volutpat diam. Nam nec sem eget leo facilisis gravida nec lobortis arcu. Nulla facilisi. Suspendisse et feugiat diam, vel hendrerit erat. Etiam ac tempus lorem. Ut et aliquet turpis.','Third','Four','Five','Six'];
    res.render('study', { title: 'Study',text: 'Learning room',active:"study",Word:words,description:desc});
});


// Post state
app.post('/register',urlencodedParser,(req,res) =>{
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    //console.log(typeof req.body.email);
    const errorID = lengthCheck(req.body.email,req.body.username,req.body.password);
    if (errorID == null){
        db.sqlInsert(req.body.email,req.body.username,req.body.password);
        res.redirect('/about');
    }else{
        res.render('index', { title: 'Register',active:'error',errorDiscription:errorID});
    }
});
app.post('/login',urlencodedParser,(req,res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    const errorID = lengthCheck(req.body.username, req.body.password);
    if (errorID == null) {
        //sqlInsert(req.body.username, req.body.password);
        res.redirect('/about');
    } else {
        res.render('login', {title: 'Login',active: 'error', errorDiscription: errorID});
    }
});
//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))