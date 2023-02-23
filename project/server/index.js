const express =  require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Aswathi@1998",
    database: "crud_operation"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM details";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req,res) => {
    const {firstname, lastname, fathersname, mothersname, email, contact, education, address, university, country } = req.body;
    const sqlInsert = 
    "INSERT INTO details (firstname, lastname, fathersname, mothersname, email, contact, education, address, university, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [firstname, lastname, fathersname, mothersname, email, contact, education, address, university, country], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req,res) => {
    const { id } = req.params;
    const sqlRemove = 
    "DELETE FROM details WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM details where id = ?";
    db.query(sqlGet, id, (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const {firstname, lastname, fathersname, mothersname, email, contact, education, address, university, country} = req.body;
    const sqlUpdate = "UPDATE details SET firstname = ?, lastname = ?, fathersname = ?, mothersname = ?, email = ?, contact = ?, education = ?, address = ?, university = ?, country = ? WHERE id = ?";
    db.query(sqlUpdate, [firstname, lastname, fathersname, mothersname, email, contact, education, address, university, country, id], (error, result) => {
        if(error) { 
            console.log(error);
        }
        res.send(result);
    });
});
 
app.get("/", (req, res) => {
    // const sqlInsert = 
    // "INSERT INTO details (firstname, lastname, fathersname, mothersname, email, contact, education, address, university, country) VALUES ('Arun', 'Mozhi', 'Ravi', 'Vasuki', 'arunmozhi@gmail.com', 8125469521, 'BSC(Maths)', 'Trichy', 'Anna University', 'India')";
    // db.query(sqlInsert, (err, result) => {
    //     console.log("error", err);
    //     console.log("result", result);
    //     res.send("Hello Express");
    // });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})