import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isAddCourse, setIsAddCourse] = useState(false); // Toggle for Add Course form
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    instructor: "",
    price: "",
    p_link: "",
    companyName: "", // Added company name to course data
  }); // State to store new course form data
  const userId = localStorage.getItem("id");
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch courses and enrolled courses
  useEffect(() => {
    fetchCourses();
    if (userId) fetchEnrolledCourses(userId);
  }, [userId]); // Adding userId as a dependency ensures the enrolled courses are updated when userId changes.

  const fetchCourses = () => {
    fetch("http://localhost:8080/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  };

  const fetchEnrolledCourses = (userId) => {
    fetch(`http://localhost:8080/api/learning/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const enrolledCourseIds = data.map(course => course.course_id);
        setEnrolledCourses(enrolledCourseIds);
      })
      .catch((error) => console.error("Error fetching enrolled courses:", error));
  };

  // Handle course enrollment
  const enrollCourse = (courseId) => {
    if (!authToken) {
      toast.error("You need to login to continue", {
        position: "top-right",
        autoClose: 1000,
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const enrollRequest = { userId, courseId };
    axios
      .post("http://localhost:8080/api/learning", enrollRequest)
      .then((response) => {
        if (response.data === "Enrolled successfully") {
          toast.success("Course Enrolled successfully", {
            position: "top-right",
            autoClose: 1000,
          });
          setEnrolledCourses((prevEnrolledCourses) => [
            ...prevEnrolledCourses,
            courseId,
          ]);
          setTimeout(() => navigate(`/course/${courseId}`), 2000);
        }
      })
      .catch((error) => console.error("Enrollment error:", error));
  };

  // Handle form input change
  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit new course form
  const handleAddCourseSubmit = (e) => {
    e.preventDefault();
    if (
      newCourse.courseName &&
      newCourse.instructor &&
      newCourse.price &&
      newCourse.p_link &&
      newCourse.companyName
    ) {
      axios
        .post("http://localhost:8080/api/courses", newCourse)
        .then((response) => {
          toast.success("Course added successfully", {
            position: "top-right",
            autoClose: 1000,
          });
          setCourses((prevCourses) => [...prevCourses, response.data]);
          setNewCourse({
            courseName: "",
            instructor: "",
            price: "",
            p_link: "",
            companyName: "",
          });
          setIsAddCourse(false);
        })
        .catch((error) => {
          console.error("Error adding course:", error);
          toast.error("Failed to add course. Please try again.", {
            position: "top-right",
            autoClose: 1000,
          });
        });
    } else {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <div>
      <Navbar page={"courses"} />

      {/* Button to toggle add course form */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setIsAddCourse(!isAddCourse)}
          style={{
            backgroundColor: "darkblue",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          {isAddCourse ? "Cancel Add Course" : "Add New Course"}
        </button>
      </div>

      {/* Add Course Form */}
      {isAddCourse && (
        <form onSubmit={handleAddCourseSubmit} style={{ marginTop: "20px" }}>
          <div>
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={newCourse.courseName}
              onChange={handleCourseChange}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <input
              type="text"
              name="instructor"
              placeholder="Instructor Name"
              value={newCourse.instructor}
              onChange={handleCourseChange}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newCourse.price}
              onChange={handleCourseChange}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <input
              type="text"
              name="p_link"
              placeholder="Image URL"
              value={newCourse.p_link}
              onChange={handleCourseChange}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={newCourse.companyName}
              onChange={handleCourseChange}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <button
              type="submit"
              style={{
                backgroundColor: "darkblue",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              Add Course
            </button>
          </div>
        </form>
      )}

      {/* Courses List */}
      <div className="courses-container" style={{ marginTop: "20px" }}>
        {courses.map((course) => (
          <div key={course.course_id} className="course-card">
            <img
              src={course.p_link}
              alt={course.courseName}
              className="course-image"
            />
            <div className="course-details">
              <h3 className="course-heading">
                {course.courseName.length < 8
                  ? `${course.courseName} Tutorial`
                  : course.courseName}
              </h3>
              <p className="course-description" style={{ color: "grey" }}>
                Price: Rs.{course.price}
              </p>
              <p className="course-description">Tutorial by {course.instructor}</p>
              <p className="course-description">Company: {course.companyName}</p>
            </div>
            {enrolledCourses.includes(course.course_id) ? (
              <button
                className="enroll-button"
                style={{
                  color: "#F4D03F",
                  backgroundColor: "darkblue",
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/learnings")}
              >
                Enrolled
              </button>
            ) : (
              <button
                className="enroll-button"
                onClick={() => enrollCourse(course.course_id)}
              >
                Enroll
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Input style to avoid repetition
const inputStyle = {
  padding: "10px",
  margin: "5px",
  width: "100%",
  fontSize: "16px",
};

export default Courses;