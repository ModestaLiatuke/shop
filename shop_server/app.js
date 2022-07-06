
const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: '50mb' }));


app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

const cors = require("cors");
app.use(cors());




const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "big_shop"
});


// READ
app.get("/admin/products", (req, res) => {
    const sql = `
    SELECT
    *
    FROM products
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//CREATE
app.post("/admin/products", (req, res) => {
    const sql = `
        INSERT INTO products
        (title, code, price, description, photo)
        VALUES (?, ?, ?, ?, ?)
    `;
    con.query(
        sql, [req.body.title, req.body.code, req.body.price, req.body.description, req.body.photo || null],
        (err, results) => {
            if (err) throw err;
            res.send(results);
        }
    );
});

// DELETE
app.delete("/admin/products/:id", (req, res) => {
    const sql = `
        DELETE FROM products
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


// EDIT
app.put("/admin/products/:id", (req, res) => {
    let sql;
    let data;

    if (!req.body.photo && !req.body.deletePhoto) {
        sql = `
        UPDATE products
        SET title = ?, description = ?, code = ?, price = ?
        WHERE id = ?
    `;
        data = [req.body.title, req.body.description, req.body.code, req.body.price, req.params.id];
    } else if (req.body.deletePhoto) {
        sql = `
        UPDATE products
        SET title = ?, description = ?, code = ?, price = ?, photo = NULL
        WHERE id = ?
    `;
        data = [req.body.title, req.body.description, req.body.code, req.body.price, req.params.id];
    } else {
        sql = `
        UPDATE products
        SET title = ?, description = ?, code = ?, price = ?, photo = ?
        WHERE id = ?
    `;
        data = [req.body.title, req.body.description, req.body.code, req.body.price, req.body.photo, req.params.id];
    }
    con.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});



// READ
app.get("/products", (req, res) => {
    const sql = `
    SELECT
    *
    FROM products
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


app.listen(port, () => {
    console.log(`Parduotuvinis Bebras klausosi ${port} porto.`);
});