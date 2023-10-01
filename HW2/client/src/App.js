import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [course_id, setCourse_id] = useState("");
  const [course_name, setCourse_name] = useState("");
  const [student_id, setStudent_id] = useState("");
  const [student_name, setStudent_name] = useState("");

  const [courseList, setCourseList] = useState([]);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    getCourseList();
    getStudentList();
  }, []);

  const addCourse = () => {
    Axios.post("http://localhost:3001/createCourse", {
      course_id: course_id,
      course_name: course_name,
    }).then(() => {
      setCourseList([
        ...courseList,
        {
          course_id: course_id,
          course_name: course_name,
        },
      ]);
    });
  };

  const getCourseList = () => {
    Axios.get("http://localhost:3001/courses").then((response) => {
      setCourseList(response.data);
    });
  };

  const addStudent = () => {
    Axios.post("http://localhost:3001/createStudent", {
      student_id: student_id,
      student_name: student_name,
    }).then(() => {
      setStudentList([
        ...studentList,
        {
          student_id: student_id,
          student_name: student_name,
        },
      ]);
    });
  };

  const getStudentList = () => {
    Axios.get("http://localhost:3001/students").then((response) => {
      setStudentList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="information">
        <div className="course-input">
          <label>Course ID:</label>
          <input
            type="text"
            onChange={(event) => {
              setCourse_id(event.target.value);
            }}
          />
          <label>Course Name:</label>
          <input
            type="text"
            onChange={(event) => {
              setCourse_name(event.target.value);
            }}
          />
          <button onClick={addCourse}>Add Course</button>
        </div>
        <div className="student-input">
          <label>Student ID:</label>
          <input
            type="text"
            onChange={(event) => {
              setStudent_id(event.target.value);
            }}
          />
          <label>Student Name:</label>
          <input
            type="text"
            onChange={(event) => {
              setStudent_name(event.target.value);
            }}
          />
          <button onClick={addStudent}>Add Student</button>
        </div>
      </div>
      <div className="courses">
        <button onClick={getCourseList}>Show Courses</button>
        {courseList.map((course, index) => {
          return (
            <div className="course" key={index}>
              <div>
                <h3>Course ID: {course.course_id}</h3>
                <h3>Course Name: {course.course_name}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="students">
        <button onClick={getStudentList}>Show Students</button>
        {studentList.map((student, index) => {
          return (
            <div className="student" key={index}>
              <div>
                <h3>Student ID: {student.student_id}</h3>
                <h3>Student Name: {student.student_name}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
