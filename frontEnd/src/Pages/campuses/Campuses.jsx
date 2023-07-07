import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCampusesThunk } from "../../Redux/campuses/campuses.actions";
import { fetchAllStudentsThunk } from "../../Redux/students/students.actions";
import CampusesList from "../../Components/campuses/AllCampusesList";
import "../../Css/campuses/CampusesPage.css";

function Campuses() {
  const allCampuses = useSelector((state) => state.campuses.allCampuses);
  const dispatch = useDispatch();
  const fetchAllCampuses = () => {
    dispatch(fetchAllCampusesThunk());
    dispatch(fetchAllStudentsThunk());
  };

  useEffect(() => {
    fetchAllCampuses();
  }, [dispatch]);

  return (
    <div>
      <div className="campusesHeading">
        <CampusesList allCampuses={allCampuses} />
      </div>
    </div>
  );
}

export default Campuses;
