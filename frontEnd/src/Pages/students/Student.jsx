import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleStudentThunk } from "../../Redux/students/students.actions";
import SingleStudentList from "../../Components/students/SingleStudentList";
import { useParams } from "react-router-dom";

function Student() {
  const singleStudent = useSelector((state) => state.students.singleStudent);
  console.log(singleStudent);
  const dispatch = useDispatch();
  const { id } = useParams();
  const fetchSingleStudent = () => {
    return dispatch(fetchSingleStudentThunk(id));
  };

  useEffect(() => {
    fetchSingleStudent();
  }, [id]);

  return (
    <div>
      <div id="singleStudentList">
        <SingleStudentList student={singleStudent} />
      </div>
    </div>
  );
}

export default Student;
