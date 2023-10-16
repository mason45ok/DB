const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// 連接至 MongoDB
mongoose.connect("mongodb://localhost:27017/student-course", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB 連接錯誤:", error);
});

db.once("open", () => {
  console.log("已成功連接至 MongoDB");
});

// 定義課程和學生的資料模型
const courseSchema = new mongoose.Schema({
  course_id: String,
  course_name: String,
});

const studentSchema = new mongoose.Schema({
  student_id: String,
  student_name: String,
});

const Course = mongoose.model("Course", courseSchema);
const Student = mongoose.model("Student", studentSchema);

// 創建課程
app.post("/createCourse", async (req, res) => {
  const { course_id, course_name } = req.body;

  try {
    const course = new Course({
      course_id,
      course_name,
    });
    await course.save();
    res.send("Course Inserted");
  } catch (error) {
    console.error("創建課程時發生錯誤:", error);
    res.status(500).send("Error creating course");
  }
});

// 創建學生
app.post("/createStudent", async (req, res) => {
  const { student_id, student_name } = req.body;

  try {
    const student = new Student({
      student_id,
      student_name,
    });
    await student.save();
    res.send("Student Inserted");
  } catch (error) {
    console.error("創建學生時發生錯誤:", error);
    res.status(500).send("Error creating student");
  }
});

// 获取课程列表
app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.send(courses);
  } catch (error) {
    console.error("獲取課程列表時發生錯誤:", error);
    res.status(500).send("Error fetching courses");
  }
});

// 获取学生列表
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find({});
    res.send(students);
  } catch (error) {
    console.error("獲取學生列表時發生錯誤:", error);
    res.status(500).send("Error fetching students");
  }
});
// 更新課程
app.put("/updateCourse/:id", async (req, res) => {
    const courseId = req.params.id;
    const { course_name } = req.body;
  
    try {
      const course = await Course.findOneAndUpdate(
        { _id: courseId },
        { course_name },
        { new: true } // 這將返回更新後的課程
      );
  
      res.send(course);
    } catch (error) {
      console.error("更新課程時發生錯誤:", error);
      res.status(500).send("Error updating course");
    }
  });
  
  // 更新學生
  app.put("/updateStudent/:id", async (req, res) => {
    const studentId = req.params.id;
    const { student_name } = req.body;
  
    try {
      const student = await Student.findOneAndUpdate(
        { _id: studentId },
        { student_name },
        { new: true } // 這將返回更新後的學生
      );
  
      res.send(student);
    } catch (error) {
      console.error("更新學生時發生錯誤:", error);
      res.status(500).send("Error updating student");
    }
  });
// 刪除課程
app.delete("/deleteCourse/:id", async (req, res) => {
    const courseId = req.params.id;
  
    try {
      await Course.findByIdAndRemove(courseId);
      res.send("Course Deleted");
    } catch (error) {
      console.error("刪除課程時發生錯誤:", error);
      res.status(500).send("Error deleting course");
    }
  });
  
  // 刪除學生
  app.delete("/deleteStudent/:id", async (req, res) => {
    const studentId = req.params.id;
  
    try {
      await Student.findByIdAndRemove(studentId);
      res.send("Student Deleted");
    } catch (error) {
      console.error("刪除學生時發生錯誤:", error);
      res.status(500).send("Error deleting student");
    }
  });
    
app.listen(3001, () => {
  console.log("你的伺服器運行在埠3001上");
});
