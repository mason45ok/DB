const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const ObjectId = mongoose.Types.ObjectId;

app.use(cors());
app.use(express.json());

// 連接至 MongoDB
mongoose.connect("mongodb+srv://41171112h:tahrd115@cluster0.etdqrs3.mongodb.net/?retryWrites=true&w=majority", {
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

// 獲得課程列表
  app.get("/courses", async (req, res) => {
    try {
      const courses = await Course.find({});
      res.send(courses);
    } catch (error) {
      console.error("獲取課程列表時發生錯誤:", error);
      res.status(500).send("Error fetching courses");
    }
  });

// 獲得學生列表
  app.get("/students", async (req, res) => {
    try {
      const students = await Student.find({});
      res.send(students);
    } catch (error) {
      console.error("獲取學生列表時發生錯誤:", error);
      res.status(500).send("Error fetching students");
    }
  });
//更新課程
app.put("/updateCourse/:id", (req, res) => {
  const courseId = req.params.id; // 使用正確的路由參數名稱 "id"
  const updatedCourseData = req.body;

  Course.findByIdAndUpdate(courseId, updatedCourseData, { new: true }) // 使用findByIdAndUpdate
    .then((updateCourse) => {
      if (!updateCourse) {
        return res.status(404).send("Course not found");
      }
      res.send(updateCourse);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating Course");
    });
});

// 更新學生
app.put("/updateStudent/:id", (req, res) => {
  const studentId = req.params.id;
  const updatedStudentData = req.body;

  Student.findByIdAndUpdate(studentId, updatedStudentData, { new: true })
    .then((updatedStudent) => {
      if (!updatedStudent) {
        return res.status(404).send("Student not found");
      }
      res.send(updatedStudent);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating Student");
    });
});
//刪除課程
app.delete("/deleteCourse/:id", async (req, res) => {
  const courseId = req.params.id;

  try {
    // 不需要將字符串轉換為ObjectId，因為Mongoose可以處理
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
    // 不需要將字符串轉換為ObjectId，因為Mongoose可以處理
    await Student.findByIdAndRemove(studentId);
    res.send("Student Deleted");
  } catch (error) {
    console.error("刪除學生時發生錯誤:", error);
    res.status(500).send("Error deleting student");
  }
});
app.get("/searchStudent", (req, res) => {
  const parsedUrl = req._parsedUrl.query;
  const inputString = parsedUrl;
  const match = inputString.match(/search=(.+)/);
  //console.log(match)
  const extractedValue = match ? match[1] : null;

 // console.log(extractedValue);
  
  const studentname = extractedValue;
  Student.find({ student_name: { $regex: studentname, $options: "i" } }) // Case-insensitive search
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error searching for users by name");
    });
});  
app.listen(3001, () => {
  console.log("你的伺服器運行在埠3001上");
});
