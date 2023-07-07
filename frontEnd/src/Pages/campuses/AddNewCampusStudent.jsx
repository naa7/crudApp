import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addStudentThunk } from "../../Redux/students/students.actions";
import { fetchSingleCampusThunk } from "../../Redux/campuses/campuses.actions";
import "../../Css/forms/AddForm.css";

function AddNewCampusStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const campus = useParams();
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    imageUrl: "",
    email: "",
    gpa: "",
    campusId: campus.id,
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleCampusThunk(campus.id));
  }, [studentData, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addStudentThunk(studentData));

    setStudentData({
      firstName: "",
      lastName: "",
      imageUrl: "",
      email: "",
      gpa: "",
      campusId: campus.id,
    });
    setSubmitted(true);
    console.log(studentData);
  };

  if (submitted) {
    navigate(`/campuses/${campus.id}`);
    return null;
  }

  return (
    <div>
      <h1 className="form-title">Add A New Student</h1>
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
        <button className="button-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNewCampusStudent;
