import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCampusThunk } from "../../Redux/campuses/campuses.actions";
import SingleCampusList from "../../Components/campuses/SingleCampusList";
import { useParams } from "react-router-dom";
import "../../Css/campuses/SingleCampusList.css";

function Campus() {
  const campus = useSelector((state) => state.campuses.singleCampus);
  const dispatch = useDispatch();
  const { id } = useParams();
  const fetchSingleCampus = (id) => {
    return dispatch(fetchSingleCampusThunk(id));
  };

  useEffect(() => {
    fetchSingleCampus(id);
  }, [id, dispatch]);

  return (
    <div>
      <div id="singleCampusList">
        <SingleCampusList campus={campus} />
      </div>
    </div>
  );
}

export default Campus;
