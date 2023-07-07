import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editCampusThunk,
  fetchSingleCampusThunk,
} from "../../Redux/campuses/campuses.actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/forms/EditAddForms.css";

function EditCampusForm(props) {
  const campusId = props.campusId.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const campus = useSelector((state) => state.campuses.singleCampus);
  const [campusData, setCampusData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleCampusThunk(campusId));
  }, [campusId, dispatch]);

  useEffect(() => {
    if (campus) {
      setCampusData({
        name: campus.name,
        imageUrl: campus.imageUrl,
        description: campus.description,
        address: campus.address,
      });
    }
  }, [campus]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCampusData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editCampusThunk(campusId, campusData));

    setCampusData({
      name: "",
      imageUrl: "",
      description: "",
      address: "",
    });
    setSubmitted(true);
  };

  const handleReturn = () => {
    navigate(`/campuses/${campusId}`);
  };

  if (submitted) {
    return (
      <div className="edit-form-message-container">
        <h2>Edits Submitted Successfully!</h2>
        <p>Campus details have been updated.</p>
        <button className="button-submit" type="return" onClick={handleReturn}>
          Return
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="form-title">Edit Campus Details</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input">
          <label className="input-label" htmlFor="name">
            Campus Name:
            <input
              className="input-field"
              type="text"
              id="name"
              name="name"
              value={campusData.name}
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
              value={campusData.imageUrl}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input">
          <label className="input-label" htmlFor="description">
            Description:
            <input
              className="input-field"
              type="text"
              id="description"
              name="description"
              value={campusData.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input">
          <label className="input-label" htmlFor="address">
            Address:
            <input
              className="input-field"
              type="text"
              id="address"
              name="address"
              value={campusData.address}
              onChange={handleChange}
            />
          </label>
        </div>
        <button className="button-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCampusForm;
