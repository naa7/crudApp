import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { deleteAStudentThunk } from "../../Redux/students/students.actions";
import "../../Css/students/SingleStudentList.css";

function SingleStudentList(props) {
  const { student } = props;
  const dispatch = useDispatch();
  const campus = student.campus;
  const navigate = useNavigate();
  const studentsCount = (campus) => {
    return campus.students && campus.students.length > 0
      ? campus.students.length
      : 0;
  };
  // console.log("STUDENTS", studentsCount(campus));

  const handleEdit = (id, option) => {
    if (option === 1) {
      navigate(`/students/${id}/edit`);
    } else {
      navigate(`/campuses/${id}/edit`);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteAStudentThunk(id)).then(() => navigate(`/students/`));
  };

  return (
    <div>
      {!student || !student.id ? (
        <div className="empty-list">
          <h2>404 Not Found</h2>
          <div>Page Not Found</div>
        </div>
      ) : (
        <div className="single-student-heading">
          <div className="single-student-header-container">
            <h1 className="single-student-header">Student Page</h1>
          </div>
          <div className="single-student-all-container" key={student.id}>
            <div className="single-student-single-container">
              <img
                src={student.imageUrl}
                alt={student.firstName}
                className="single-student-student-image"
              />
              <div>
                <p className="single-student-student-name">
                  {student.firstName} {student.lastName}
                </p>
                <div className="single-student-email-address">
                  Email: {student.email}
                </div>
                <div className="single-student-student-gpa">
                  {" "}
                  GPA: {student.gpa}
                </div>
                <div className="single-student-buttons-container">
                  <button
                    className="single-student-edit-button"
                    onClick={() => handleEdit(student.id, 1)}
                  >
                    Edit
                  </button>
                  <button
                    className="single-student-delete-button"
                    onClick={() => handleDelete(student.id, 1)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          {campus ? (
            <div className="single-student-campus-header-container">
              <h2 className="single-student-campus-header">Campus</h2>
            </div>
          ) : (
            <div>No campus</div>
          )}
          {campus && (
            <div className="single-student-campus-all-container">
              <div key={campus.id} className="single-student-campus-container">
                {campus.imageUrl && (
                  <img
                    src={campus.imageUrl}
                    alt={campus.name}
                    className="single-student-campus-image"
                  />
                )}
                <div className="single-student-campus-details">
                  <div className="single-student-campus-name">
                    <p>
                      <Link
                        to={`/campuses/${campus.id}`}
                        className="single-student-campus-link-hover"
                      >
                        {campus.name}
                      </Link>
                    </p>
                  </div>
                  <div>
                    <p className="single-student-campus-address">
                      {campus.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SingleStudentList;
