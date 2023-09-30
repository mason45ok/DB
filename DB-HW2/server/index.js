const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "@Mason45ok",
  database: "student-course",
});

app.post("/create", (req, res) => {
  const course_id = req.body.course_id;
  const course_name = req.body.course_name;

  db.query(
    "INSERT INTO courses (course_id, course_name) VALUES (?, ?)",
    [course_id, course_name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Course Inserted");
      }
    }
  );
});

app.get("/courses", (req, res) => {
  db.query("SELECT * FROM courses", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE courses SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM courses WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3000, () => {
  console.log("Your server is running on port 3000");
});
