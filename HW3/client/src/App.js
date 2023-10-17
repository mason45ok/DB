import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [course_id, setCourse_id] = useState("");
  const [course_name, setCourse_name] = useState("");
  const [student_id, setStudent_id] = useState("");
  const [student_name, setStudent_name] = useState("");

  const [courseList, setCourseList] = useState([]);
  const [studentList, setStudentList] = useState([]);

  const [editCourseId, setEditCourseId] = useState("");
  const [editCourseName, setEditCourseName] = useState("");
  const [editStudentId, setEditStudentId] = useState("");
  const [editStudentName, setEditStudentName] = useState("");

  // const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getCourseList();
    getStudentList();
  }, []);

  const addCourse = () => {
    Axios.post("http://localhost:3001/createCourse", {
      course_id: course_id,
      course_name: course_name,
    }).then(() => {
      getCourseList();
      setCourse_id("");
      setCourse_name("");
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
      getStudentList();
      setStudent_id("");
      setStudent_name("");
    });
  };

  const getStudentList = () => {
    Axios.get("http://localhost:3001/students").then((response) => {
      setStudentList(response.data);
    });
  };

  const editCourse = (course) => {
    setEditCourseId(course._id);
    setEditCourseName(course.course_name);
  };

  const updateCourse = () => {
    Axios.put(`http://localhost:3001/updateCourse/${editCourseId}`, {
      course_name: editCourseName,
    }).then(() => {
      getCourseList();
      setEditCourseId("");
      setEditCourseName("");
    });
  };

  const deleteCourse = (courseId) => {
    Axios.delete(`http://localhost:3001/deleteCourse/${courseId}`).then(() => {
      getCourseList();
    });
  };

  const editStudent = (student) => {
    setEditStudentId(student._id);
    setEditStudentName(student.student_name);
  };

  const updateStudent = () => {
    Axios.put(`http://localhost:3001/updateStudent/${editStudentId}`, {
      student_name: editStudentName,
    }).then(() => {
      getStudentList();
      setEditStudentId("");
      setEditStudentName("");
    });
  };

  const deleteStudent = (studentId) => {
    Axios.delete(`http://localhost:3001/deleteStudent/${studentId}`).then(() => {
      getStudentList();
    });
  };

  // const searchStudent = () => {
  //   Axios.get(`http://localhost:3001/searchstudent?search=${searchQuery}`).then(
  //     (response) => {
  //       setSearchResults(response.data);
  //     }
  //   );
  // };

  return (
    <div className="App">
      <div className="information">
        <div className="course-input">
          <label>Course ID:</label>
          <input
            type="text"
            value={course_id}
            onChange={(event) => {
              setCourse_id(event.target.value);
            }}
          />
          <label>Course Name:</label>
          <input
            type="text"
            value={course_name}
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
            value={student_id}
            onChange={(event) => {
              setStudent_id(event.target.value);
            }}
          />
          <label>Student Name:</label>
          <input
            type="text"
            value={student_name}
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
              <div>
                {/* 添加 "Edit" 和 "Update" 按钮 */}
                <button onClick={() => editCourse(course)}>Edit</button>
                <button onClick={() => deleteCourse(course._id)}>Delete</button>
                {editCourseId === course._id && (
                  <div>
                    <input
                      type="text"
                      value={editCourseName}
                      onChange={(event) => {
                        setEditCourseName(event.target.value);
                      }}
                    />
                    <button onClick={updateCourse}>Update</button>
                  </div>
                )}
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
              <div>
                {/* 添加 "Edit" 和 "Update" 按钮 */}
                <button onClick={() => editStudent(student)}>Edit</button>
                <button onClick={() => deleteStudent(student._id)}>Delete</button>
                {editStudentId === student._id && (
                  <div>
                    <input
                      type="text"
                      value={editStudentName}
                      onChange={(event) => {
                        setEditStudentName(event.target.value);
                      }}
                    />
                    <button onClick={updateStudent}>Update</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
