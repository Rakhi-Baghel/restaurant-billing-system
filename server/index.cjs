console.log(__filename);
console.log("RUNNING NEW INDEX FILE");

const express = require("express");
const cors = require("cors");
const db = require("./database.cjs");

const app = express();
app.use(cors());
app.use(express.json());

/* ---------------- TEST ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("Backend Connected Successfully");
});

/* ---------------- SHOP SETUP ---------------- */

// Get shop info
app.get("/shop", (req, res) => {
  db.get("SELECT * FROM shop LIMIT 1", (err, row) => {

    if (err) {
      return res.status(500).json(err);
    }

    if (!row) {
      return res.json({
        name: "Burger King",
        owner: "Rakhi",
        address: "Delhi",
        gst: "GST123"
      });
    }

    res.json(row);

  });
});



// Save shop info (first time only)
app.post("/shop", (req, res) => {
  const { name, owner, address, gst } = req.body;

  db.run(
    `INSERT INTO shop (name, owner, address, gst)
     VALUES (?, ?, ?, ?)`,
    ["Burger King", "Rakhi", "Delhi", "gst123"],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: "Shop saved successfully" });
    }
  );
});

/* ---------------- ITEMS ROUTES ---------------- */

// Get all items
app.get("/items", (req, res) => {
  db.all("SELECT * FROM items", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// Add new item
app.post("/items", (req, res) => {
  const { name, price } = req.body;

  db.run(
    "INSERT INTO items (name, price) VALUES (?, ?)",
    [name, price],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: "Item added successfully" });
    }
  );
});

//Delete item
app.delete("/delete-item/:id", (req,res)=>{

  const id = req.params.id;

  db.run(
    "DELETE FROM items WHERE id=?",
    [id],
    function(err){
      if(err){
        return res.status(500).json(err);
      }

      res.json({message:"Item deleted"});
    }
  );

});

/* ---------------- SAVE BILL ---------------- */

app.post("/create-order", (req, res) => {

  const { items, total } = req.body;

  const date = new Date().toISOString();

  db.run(
    `INSERT INTO orders (items, total, date) VALUES (?, ?, ?)`,
    [JSON.stringify(items), total, date],
    function(err){
      if(err){
        return res.status(500).json(err);
      }

      res.json({
        message:"Bill saved",
        orderId:this.lastID
      });
    }
  );

});

app.put("/items/:id", (req,res)=>{

  const {name,price} = req.body;
  const id = req.params.id;

  db.run(
    "UPDATE items SET name=?, price=? WHERE id=?",
    [name,price,id],
    function(err){

      if(err){
        return res.status(500).json(err);
      }

      res.json({message:"Item updated successfully"});

    }
  );

});

/* ---------------- GET ALL ORDERS ---------------- */

app.get("/orders", (req, res) => {

  db.all("SELECT * FROM orders ORDER BY id DESC", [], (err, rows) => {
    if(err){
      return res.status(500).json(err);
    }

    res.json(rows);
  });

});



app.get("/order/:id", (req,res)=>{

  const id = req.params.id;

  db.get(
    "SELECT * FROM orders WHERE id=?",
    [id],
    (err,row)=>{
      if(err){
        return res.status(500).json(err);
      }

      res.json(row);
    }
  );

});


/* ---------------- START SERVER ---------------- */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});