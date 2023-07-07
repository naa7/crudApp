import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { deleteAStudentThunk } from "../../Redux/students/students.actions";
import "../../Css/students/AllStudentsList.css";
import "../../Css/forms/EditAddForms.css";

function Students(props) {
  const { allStudents, allCampuses } = props;
  const dispatch = useDispatch();
  const campusesArray = Object.values(allCampuses);
  const navigate = useNavigate();

  const getCampusName = (campusId) => {
    const campus = campusesArray.find((campus) => campus.id === campusId);
    return campus ? campus.name : "Unknown Campus";
  };

  const handleDelete = (id) => {
    dispatch(deleteAStudentThunk(id));
  };

  const handleAddStudent = () => {
    navigate("/students/add");
  };

  const handleEdit = (studentId) => {
    navigate(`/students/${studentId}/edit`);
  };

  return (
    <div>
      <div>
        <div className="studentsHeader-container">
          <h1 className="studentsHeader">Students Page</h1>
        </div>
      </div>
      <div>
        <button className="students-add-button" onClick={handleAddStudent}>
          Add Student
        </button>
      </div>
      <div>
        {!allStudents || allStudents.length === 0 ? (
          <div className="empty-students">
            <div>Empty</div>
            <div>No campuses</div>
          </div>
        ) : (
          <div className="students-all-container">
            {allStudents.map((student) => (
              <div key={student.id} className="students-single-container">
                <img
                  src={student.imageUrl}
                  alt={student.firstName}
                  className="students-single-image"
                />
                <div className="students-student-details">
                  <div className="students-student-name">
                    <p>
                      <Link
                        to={`/students/${student.id}`}
                        className="students-link-hover"
                      >
                        {student.firstName} {student.lastName}
                      </Link>
                    </p>
                  </div>
                  <div>
                    <p className="students-campus-name">
                      {getCampusName(student.campusId)}
                    </p>
                  </div>
                </div>
                <div className="students-buttons-container">
                  <button
                    className="students-edit-button"
                    onClick={() => handleEdit(student.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="students-delete-button"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Students;
