import { useDispatch } from "react-redux";
import { addCampusThunk } from "../../Redux/campuses/campuses.actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/forms/AddForm.css";

function AddNewCampus() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [campusData, setCampusData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCampusData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!campusData.imageUrl) {
      // Set a default image URL if it is empty/
      setCampusData((prevData) => ({
        ...prevData,
        imageUrl:
          "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg",
      }));
    }

    console.log(campusData);
    dispatch(addCampusThunk(campusData));

    setCampusData({
      name: "",
      imageUrl: "",
      description: "",
      address: "",
    });
    setSubmitted(true);
  };

  if (submitted) {
    navigate("/campuses");
    return null;
  }

  return (
    <div className="container">
      <h1 className="form-title">Add A New Campus</h1>
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
              required
              placeholder="Enter Campus Name"
              pattern="^[a-zA-Z\s]+$"
            />
            <span id="campusError">
              Please enter a valid campus name. Special characters or numbers
              are not allowed.
            </span>
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
              placeholder="Enter Image URL"
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
              required
              placeholder="Enter Campus Description"
              pattern="^[^\d]{10,500}$"
            />
            <span id="descriptionError">
              Please enter a valid description. The description must be between
              10 and 500 characters long. Numbers are not allowed.
            </span>
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
              required
              placeholder="Enter Campus Address"
              pattern="^(?=.*\d).{10,46}$"
            />
            <span id="addressError">
              Please enter a valid address. Address must be between 10 and 46
              characters long.
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

export default AddNewCampus;
