import axios from "axios";
import StudentActionType from "./students.types";

export const fetchAllStudents = (payload) => {
  console.log("Fetch all students action");
  return {
    type: StudentActionType.FETCH_ALL_STUDENTS,
    payload: payload,
  };
};

export const fetchAllStudentsThunk = () => {
  return async (dispatch) => {
    try {
      console.log("fetchAllStudentsThunk is firing");
      const response = await axios.get("http://localhost:8080/api/students");
      console.log("fetchAllStudentsThunk completed");
      dispatch(fetchAllStudents(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSingleStudent = (payload) => {
  console.log("Fetch a single student action");
  return {
    type: StudentActionType.FETCH_SINGLE_STUDENT,
    payload: payload,
  };
};

export const fetchSingleStudentThunk = (studentId) => {
  return async (dispatch) => {
    try {
      console.log("fetchSingleStudentThunk is firing");
      const response = await axios.get(
        `http://localhost:8080/api/students/${studentId}`
      );
      console.log("fetchSingleStudentThunk completed");
      dispatch(fetchSingleStudent(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addStudent = (studentData) => {
  console.log("Add student action");
  return {
    type: StudentActionType.ADD_STUDENT,
    payload: studentData,
  };
};

export const addStudentThunk = (studentData) => {
  return async (dispatch) => {
    try {
      console.log("addStudentThunk is firing");
      console.log("studentDATA", studentData);
      const response = await axios.post(
        "http://localhost:8080/api/students",
        studentData
      );
      console.log("addStudentThunk completed");
      dispatch(addStudent(response.data));
      dispatch(fetchAllStudentsThunk());
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteAStudent = (payload) => {
  console.log("Delete a student action");
  return {
    type: StudentActionType.DELETE_STUDENT,
    payload: payload,
  };
};

export const deleteAStudentThunk = (studentId) => {
  return async (dispatch) => {
    try {
      console.log("deleteAStudentThunk is firing");
      const response = await axios.delete(
        `http://localhost:8080/api/students/${studentId}`
      );
      console.log("deleteAStudentThunk completed");
      dispatch(deleteAStudent(response.data));
      dispatch(fetchAllStudentsThunk());
    } catch (error) {
      console.error(error);
    }
  };
};

export const editStudent = (studentId, updates) => {
  console.log("Edit student action");
  return {
    type: StudentActionType.EDIT_STUDENT,
    payload: {
      id: studentId,
      updates: updates,
    },
  };
};

export const editStudentThunk = (studentId, updates) => {
  return async (dispatch) => {
    try {
      console.log("editStudentThunk is firing");

      console.log("studentDATA", updates);
      console.log("studentId", studentId);

      const response = await axios.put(
        `http://localhost:8080/api/students/${studentId}`,
        updates
      );
      console.log("editStudentThunk completed");
      dispatch(editStudent(studentId, response.data));
    } catch (error) {
      console.error(error);
    }
  };
};
