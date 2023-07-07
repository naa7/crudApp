import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudentsThunk } from "../../Redux/students/students.actions";
import { fetchAllCampusesThunk } from "../../Redux/campuses/campuses.actions";
import StudentsList from "../../Components/students/AllStudentsList";
import "../../Css/students/StudentsPage.css";

function Students() {
  const allStudents = useSelector((state) => state.students.allStudents);
  const allCampuses = useSelector((state) => state.campuses.allCampuses);
  const dispatch = useDispatch();

  const fetchAllStudents = () => {
    dispatch(fetchAllStudentsThunk());
    dispatch(fetchAllCampusesThunk());
  };

  useEffect(() => {
    fetchAllStudents();
  }, [dispatch]);

  return (
    <div>
      <div className="studentsHeading">
        <StudentsList allStudents={allStudents} allCampuses={allCampuses} />
      </div>
    </div>
  );
}

export default Students;
