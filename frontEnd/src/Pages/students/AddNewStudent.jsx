import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStudentThunk } from "../../Redux/students/students.actions";
import { fetchAllCampusesThunk } from "../../Redux/campuses/campuses.actions";
import "../../Css/forms/AddForm.css";

function AddNewStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCampuses = useSelector((state) => state.campuses.allCampuses);
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    imageUrl: "",
    email: "",
    gpa: "",
    campusId: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCampusesThunk());
    dispatch(fetchAllCampusesThunk());
  }, [studentData, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!studentData.imageUrl) {
      // Set a default image URL if it is empty/
      setStudentData((prevData) => ({
        ...prevData,
        imageUrl:
          "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg",
      }));
    }

    dispatch(addStudentThunk(studentData));

    setStudentData({
      firstName: "",
      lastName: "",
      imageUrl: "",
      email: "",
      gpa: "",
      campusId: "",
    });
    setSubmitted(true);
    console.log(studentData);
  };

  if (submitted) {
    navigate("/students");
    return null;
  }

  return (
    <div className="container">
      <h1 className="form-title">Add New Student</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="firstName" className="input-label">
            First Name:
            <input
              id="firstName"
              className="input-field"
              type="text"
              name="firstName"
              value={studentData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter Student First Name"
              pattern="^[a-zA-Z\s]+$"
            />
            <span id="firstError">
              Please enter a valid first name. Special characters or numbers are
              not allowed.
            </span>
          </label>
        </div>
        <div className="input">
          <label htmlFor="lastName" className="input-label">
            Last Name:
            <input
              id="lastName"
              className="input-field"
              type="text"
              name="lastName"
              value={studentData.lastName}
              required
              onChange={handleChange}
              placeholder="Enter Student Last Name"
              pattern="^[a-zA-Z\s]+$"
            />
            <span id="lastError">
              Please enter a valid last name. Special characters or numbers are
              not allowed.
            </span>
          </label>
        </div>
        <div className="input">
          <label htmlFor="imageUrl" className="input-label">
            Image URL:
            <input
              id="imageUrl"
              className="input-field"
              type="text"
              name="imageUrl"
              placeholder="Enter Image URL"
              value={studentData.imageUrl}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input">
          <label htmlFor="email" className="input-label">
            Email:
            <input
              id="email"
              className="input-field"
              type="email"
              name="email"
              value={studentData.email}
              onChange={handleChange}
              required
              placeholder="Enter Student Email"
            />
            <span id="emailError">Please enter a valid email.</span>
          </label>
        </div>
        <div className="input">
          <label htmlFor="gpa" className="input-label">
            GPA:
            <input
              id="gpa"
              className="input-field"
              type="text"
              name="gpa"
              value={studentData.gpa}
              onChange={handleChange}
              required
              placeholder="Enter Student GPA"
              pattern="^(?:[0-4](?:\.\d{1,2})?|\.\d{1,2})$"
            />
            <span id="gpaError">
              Please enter a valid GPA. The number should be from 0-4,
              optionally with up to two decimal places
            </span>
          </label>
        </div>
        <div className="input">
          <label htmlFor="campusId" className="input-selectlabel">
            Campus:
            <select
              id="campusId"
              className="input-select"
              name="campusId"
              value={studentData.campusId}
              onChange={handleChange}
            >
              <option value="">Select a campus</option>
              {allCampuses.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="button-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNewStudent;
