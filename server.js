const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const dbEmployee = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YOUR_PASSWORD",
    database: "employee"
});

const dbAuth = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_PASSWORD',
    database: 'user_auth'
});

dbEmployee.connect((err) => {
    if (err) {
        console.error("Employee Database connection failed:", err);
    } else {
        console.log("Connected to Employee MySQL Database!");
    }
});

dbAuth.connect(err => {
    if (err) throw err;
    console.log('Connected to User Auth MySQL Database...');
});

function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/');
}

app.get('/', (req, res) => {
    res.render('index', { message: req.flash('message'), error: req.flash('error') });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    dbAuth.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err || results.length === 0) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/');
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/');
        }

        req.session.userId = user.id;
        req.session.username = user.username;
        res.redirect('/landing');
    });
});

app.get('/landing', isAuthenticated, (req, res) => {
    res.render('landing', { username: req.session.username });
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/landing');
        }
        res.redirect('/');
    });
});

app.post("/add", (req, res) => {
    const { name, email, position, salary, department, qualification, experience, address, phone, date_of_birth, date_of_joining } = req.body;
    const sql = "INSERT INTO employees (name, email, position, salary, department, qualification, experience, address, phone, date_of_birth, date_of_joining) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    dbEmployee.query(sql, [name, email, position, salary, department, qualification, experience, address, phone, date_of_birth, date_of_joining], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Employee added successfully!");
    });
});

app.post("/check-email", (req, res) => {
    const { email, id } = req.body;
    const sql = "SELECT * FROM employees WHERE email = ? AND id != ?";
    dbEmployee.query(sql, [email, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ exists: result.length > 0 });
    });
});

app.post("/check-phone", (req, res) => {
    const { phone, id } = req.body;
    const sql = "SELECT * FROM employees WHERE phone = ? AND id != ?";
    dbEmployee.query(sql, [phone, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ exists: result.length > 0 });
    });
});

app.put("/edit/:id", (req, res) => {
    const { name, email, position, salary, department, qualification, experience, address, phone, date_of_birth, date_of_joining } = req.body;
    const { id } = req.params;
    const sql = "UPDATE employees SET name=?, email=?, position=?, salary=?, department=?, qualification=?, experience=?, address=?, phone=?, date_of_birth=?, date_of_joining=? WHERE id=?";
    dbEmployee.query(sql, [name, email, position, salary, department, qualification, experience, address, phone, date_of_birth, date_of_joining, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Employee updated successfully!");
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM employees WHERE id=?";
    dbEmployee.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Employee deleted successfully!");
    });
});

app.get("/details/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM employees WHERE id = ?";
    dbEmployee.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send("Employee not found");
        }
    });
});

app.get("/search/:name", (req, res) => {
    const { name } = req.params;
    const sql = "SELECT * FROM employees WHERE name LIKE ?";
    dbEmployee.query(sql, [`%${name}%`], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
});

app.get("/display", (req, res) => {
    const sql = "SELECT * FROM employees";
    dbEmployee.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
