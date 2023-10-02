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
  database: "student-course", // 这里使用你的数据库名称
});

// 创建课程
app.post("/createCourse", (req, res) => {
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

// 获取课程列表
app.get("/courses", (req, res) => {
  db.query("SELECT * FROM courses", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// 创建学生
app.post("/createStudent", (req, res) => {
  const student_id = req.body.student_id;
  const student_name = req.body.student_name;

  db.query(
    "INSERT INTO students (student_id, student_name) VALUES (?, ?)",
    [student_id, student_name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Student Inserted");
      }
    }
  );
});

// 获取学生列表
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
// 更新课程
app.put("/updateCourse", (req, res) => {
  const course_id = req.body.course_id;
  const course_name = req.body.course_name;

  db.query(
    "UPDATE courses SET course_name = ? WHERE course_id = ?",
    [course_name, course_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Course Updated");
      }
    }
  );
});

// 更新学生
app.put("/updateStudent", (req, res) => {
  const student_id = req.body.student_id;
  const student_name = req.body.student_name;

  db.query(
    "UPDATE students SET student_name = ? WHERE student_id = ?",
    [student_name, student_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Student Updated");
      }
    }
  );
});
