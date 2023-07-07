import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleStudentThunk,
  editStudentThunk,
} from "../../Redux/students/students.actions";
import { fetchAllCampusesThunk } from "../../Redux/campuses/campuses.actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/forms/EditAddForms.css";

function EditStudentForm(props) {
  const studentId = props.studentId.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const student = useSelector((state) => state.students.singleStudent);
  const allCampuses = useSelector((state) => state.campuses.allCampuses);

  console.log("allCampuses", allCampuses);
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
    dispatch(fetchSingleStudentThunk(studentId));
  }, [studentId, dispatch]);

  useEffect(() => {
    if (student) {
      setStudentData({
        firstName: student.firstName,
        lastName: student.lastName,
        imageUrl: student.imageUrl,
        email: student.email,
        gpa: student.gpa,
        campusId: studentData.campusId,
      });
    }
  }, [student]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudentData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editStudentThunk(studentId, studentData));

    setStudentData({
      firstName: "",
      lastName: "",
      imageUrl: "",
      email: "",
      gpa: "",
      campusId: "",
    });
    setSubmitted(true);
  };

  const handleReturn = () => {
    navigate(`/students/${studentId}`);
  };

  if (submitted) {
    return (
      <div className="edit-form-message-container">
        <h2>Success!</h2>
        <p>Student details have been updated.</p>
        <button className="button-submit" type="return" onClick={handleReturn}>
          Return
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="form-title">Edit Student Details</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input">
          <label className="input-label" htmlFor="firstName">
            First Name:
            <input
              className="input-field"
              type="text"
              id="firstName"
              name="firstName"
              value={studentData.firstName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input">
          <label className="input-label" htmlFor="lastName">
            Last Name:
            <input
              className="input-field"
              type="text"
              id="lastName"
              name="lastName"
              value={studentData.lastName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input">
          <label className="input-label" htmlFor="imageUrl">
            Image URL:
            <input
              className="input-field"
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={studentData.imageUrl}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input">
          <label className="input-label" htmlFor="email">
            Email:
            <input
              className="input-field"
              type="text"
              id="email"
              name="email"
              value={studentData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input">
          <label className="input-label" htmlFor="gpa">
            GPA:
            <input
              className="input-field"
              type="text"
              id="gpa"
              name="gpa"
              value={studentData.gpa}
              onChange={handleChange}
            />
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

export default EditStudentForm;
