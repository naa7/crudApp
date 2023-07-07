import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAStudentThunk } from "../../Redux/students/students.actions";
import {
  fetchSingleCampusThunk,
  deleteACampusThunk,
} from "../../Redux/campuses/campuses.actions";
import "../../Css/campuses/SingleCampusList.css";

function SingleCampusList(props) {
  const { campus } = props;
  const students = campus.students;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const studentsCount = (campus) => {
    return campus.students && campus.students.length > 0
      ? campus.students.length
      : 0;
  };

  const handleStudentDelete = (id) => {
    // Refreshes the page automatically after you delete
    dispatch(deleteAStudentThunk(id)).then(() =>
      dispatch(fetchSingleCampusThunk(campus.id))
    );
  };

  const handleCampusDelete = (id) => {
    dispatch(deleteACampusThunk(id)).then(() => navigate("/campuses"));
  };

  const handleAddStudent = () => {
    navigate(`/campuses/${campus.id}/addStudent`);
  };

  const handleStudentEdit = (studentId) => {
    navigate(`/students/${studentId}/edit`);
  };

  const handleCampusEdit = (studentId) => {
    navigate(`/campuses/${campus.id}/edit`);
  };

  return (
    <div>
      {Object.keys(campus).length === 0 ? (
        <div>
          <h2>404 Not Found</h2>
          <div>Page Not Found</div>
        </div>
      ) : (
        <div className="single-campus-heading">
          <div className="single-campus-header-container">
            <h1 className="single-campus-header">Campus Page</h1>
          </div>
          <div className="single-campus-all-container">
            <div className="single-campus-single-container" key={campus.id}>
              <div>
                <img
                  src={campus.imageUrl}
                  alt={campus.Name}
                  className="single-campus-campus-image"
                />
              </div>
              <div>
                <h2 className="single-campus-campus-name">{campus.name}</h2>
                <div className="single-campus-campus-address">
                  {campus.address}
                </div>
                <div className="single-campus-campus-description">
                  {campus.description}
                </div>
                <div className="single-campus-student-count">
                  Number of students: {studentsCount(campus)}
                </div>
                <div className="single-campus-buttons-container">
                  <button
                    className="single-campus-edit-button"
                    onClick={() => handleCampusEdit(campus.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="single-campus-delete-button"
                    onClick={() => handleCampusDelete(campus.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              className="single-campus-add-button"
              onClick={handleAddStudent}
            >
              Add Student
            </button>
          </div>

          {students && students.length > 0 ? (
            <div>
              <div className="single-campus-students-header-container">
                <h2 className="single-campus-students-header">Students</h2>
              </div>
              <div className="single-campus-students-container">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="single-campus-student-container"
                  >
                    <img
                      src={student.imageUrl}
                      alt={student.firstName}
                      className="single-campus-student-image"
                    />
                    <div className="single-campus-student-name">
                      <p>
                        <Link
                          to={`/students/${student.id}`}
                          className="single-campus-student-link-hover"
                        >
                          {student.firstName} {student.lastName}
                        </Link>
                      </p>
                    </div>
                    <div className="single-campus-buttons-container">
                      <button
                        className="single-campus-student-edit-button"
                        onClick={() => handleStudentEdit(student.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="single-campus-student-delete-button"
                        onClick={() => handleStudentDelete(student.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>No students</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SingleCampusList;
