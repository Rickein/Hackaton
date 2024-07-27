const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const { geraSessao } = require("./src/scripts/GeraSessao");
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: geraSessao(),
    resave: false,
    saveUninitialized: true
}));

app.use(cors({
    origin: '*',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type'
}));

app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.redirect('/Login');
// });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.redirect('/Login');
});


const Login = require("./src/routes/Login");
app.use('/Login', Login);

const Voluntariado = require("./src/routes/Voluntariado");
app.use('/Voluntariado', Voluntariado);

const Voluntarios = require("./src/routes/Voluntarios");
app.use('/Voluntarios', Voluntarios);

const ONGs = require("./src/routes/ONGs");
app.use('/ONGs', ONGs);

const Api = require("./src/routes/api");
app.use('/api', Api);

const port = 8000;
app.listen(port, () => {
    console.log(`Escutando na porta ${port}`)
})
