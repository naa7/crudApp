import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteACampusThunk } from "../../Redux/campuses/campuses.actions";
import { useDispatch } from "react-redux";
import "../../Css/campuses/AllCampusesList.css";
import "../../Css/forms/EditAddForms.css";

function CampusesList(props) {
  const { allCampuses } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const studentsCount = (campus) => {
    return campus.students && campus.students.length > 0
      ? campus.students.length
      : 0;
  };

  const handleDelete = (id) => {
    dispatch(deleteACampusThunk(id));
  };

  const handleAddCampus = () => {
    navigate("/campuses/add");
  };

  const handleEdit = (campusId) => {
    navigate(`/campuses/${campusId}/edit`);
  };

  return (
    <div>
      <div className="campusesHeader-container">
        <h1 className="campusesHeader">Campuses Page</h1>
      </div>
      <div>
        <button className="campuses-add-button" onClick={handleAddCampus}>
          Add Campus
        </button>
      </div>
      <div>
        {!allCampuses || allCampuses.length === 0 ? (
          <div className="empty-campuses">
            <div>Empty</div>
            <div>No campuses</div>
          </div>
        ) : (
          <div className="campuses-all-container">
            {allCampuses.map((campus) => (
              <div key={campus.id} className="campuses-single-container">
                <img
                  src={campus.imageUrl}
                  alt={campus.name}
                  className="campuses-single-image"
                />
                <div className="campuses-details">
                  <div className="campuses-name">
                    <p>
                      <Link
                        to={`/campuses/${campus.id}`}
                        className="campuses-link-hover"
                      >
                        {campus.name}
                      </Link>
                    </p>
                  </div>
                  <div className="campuses-students-count">
                    <p>{studentsCount(campus)} students</p>
                  </div>
                </div>
                <div className="campuses-buttons-container">
                  <button
                    className="campuses-edit-button"
                    onClick={() => handleEdit(campus.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="campuses-delete-button"
                    onClick={() => handleDelete(campus.id)}
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

export default CampusesList;
