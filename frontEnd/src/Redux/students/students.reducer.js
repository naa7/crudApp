import StudentActionType from "./students.types";

export const INITIAL_STATE = {
  allStudents: [],
  singleStudent: {},
};

const studentReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case StudentActionType.FETCH_ALL_STUDENTS:
      return { ...state, allStudents: payload };

    case StudentActionType.FETCH_SINGLE_STUDENT:
      return { ...state, singleStudent: payload };

    case StudentActionType.ADD_STUDENT:
      return { ...state, allStudents: [...state.allStudents, payload] };

    case StudentActionType.DELETE_STUDENT:
      const updatedStudents = state.allStudents.filter(
        (student) => student.id !== payload
      );
      return { ...state, allStudents: updatedStudents };

    case StudentActionType.EDIT_STUDENT:
      const editedStudents = state.allStudents.map((student) => {
        if (student.id === payload.id) {
          return { ...student, ...payload.updates };
        }
        return student;
      });
      return { ...state, allStudents: editedStudents };

    default:
      return state;
  }
};

export default studentReducer;
