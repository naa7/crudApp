import { combineReducers } from "redux";
import StudentReducer from "./students/students.reducer";
import CampusReducer from "./campuses/campuses.reducer";

const rootReducer = combineReducers({
  students: StudentReducer,
  campuses: CampusReducer,
});

export default rootReducer;
