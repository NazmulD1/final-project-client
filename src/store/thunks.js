/*==================================================
/src/store/thunks.js

It contains all Thunk Creators and Thunks.
================================================== */
import * as ac from './actions/actionCreators';  // Import Action Creators ("ac" keyword Action Creator)
const axios = require('axios');
axios.defaults.baseURL = "http://localhost:5001";


//All Campuses
// THUNK CREATOR:
export const fetchAllCampusesThunk = () => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get "campuses" data from database
    let res = await axios.get(`/api/campuses`);  
    // Call Action Creator to return Action object (type + payload with "campuses" data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.fetchAllCampuses(res.data));
  } catch(err) {
    console.error(err);
  }
};

// Single Campus
// THUNK CREATOR:
export const fetchCampusThunk = (id) => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get a student data (based on "id")from database
    let res = await axios.get(`/api/campuses/${id}`);  
    dispatch(ac.fetchCampus(res.data));
  } catch(err) {
    console.error(err);
  }
};

// THUNK CREATOR: Add Campus
export const addCampusThunk = (campus) => async (dispatch) => {
  try {
    console.log("Submitting campus:", campus); // Check what's being sent

    const res = await axios.post("/api/campuses", campus);

    console.log("Success:", res.data); // Log backend response

    dispatch(ac.addCampus(res.data));
    return res.data;
  } catch (err) {
    console.error("❌ Error creating campus:", err.response?.data || err.message);
    return null;
  }
};



// Edit Campus
// THUNK CREATOR:
export const editCampusThunk = campus => async dispatch => {  // The THUNK
  try {
    // API "put" call to update student (based on "id" and "student" object's data) from database
    let updatedCampus = await axios.put(`/api/campuses/${campus.campusId || campus.id}`, campus); 
    // Update successful so change state with dispatch
    dispatch(ac.editCampus(updatedCampus.data));
    return updatedCampus.data;
  } catch(err) {
    console.error(err);
  }
};

// All Students
// THUNK CREATOR:
export const fetchAllStudentsThunk = () => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get "students" data from database
    let res = await axios.get(`/api/students`);  
    // Call Action Creator to return Action object (type + payload with "students" data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.fetchAllStudents(res.data));  
  } catch(err) {
    console.error(err);
  }
};

// Add Student
// THUNK CREATOR:
export const addStudentThunk = (student) => async (dispatch) => {  // The THUNK
  try {
    // API "post" call to add "student" object's data to database
    let res = await axios.post(`/api/students`, student);  
    // Call Action Creator to return Action object (type + payload with new students data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.addStudent(res.data));
    return res.data;
  } catch (err) {
    console.error("❌ Error adding student:", err.response?.data || err.message);
    throw err; // let the container handle the error too
  }
};

// Delete Student
// THUNK CREATOR:
export const deleteStudentThunk = studentId => async dispatch => {  // The THUNK
  try {
    // API "delete" call to delete student (based on "studentID") from database
    await axios.delete(`/api/students/${studentId}`);  
    // Delete successful so change state with dispatch
    dispatch(ac.deleteStudent(studentId));
  } catch(err) {
    console.error(err);
  }
};

// Delete Campus
// THUNK CREATOR:
export const deleteCampusThunk = campusId => async dispatch => {  // The THUNK
  try {
    // API "delete" call to delete student (based on "studentID") from database
    await axios.delete(`/api/campuses/${campusId}`);  
    // Delete successful so change state with dispatch
    dispatch(ac.deleteCampus(campusId));
    

  } catch(err) {
    console.error(err);
  }
};

// Edit Student
// THUNK CREATOR:
export const editStudentThunk = student => async dispatch => {  // The THUNK
  try {
    // API "put" call to update student (based on "id" and "student" object's data) from database
    let updatedStudent = await axios.put(`/api/students/${student.id}`, student); 
    // Update successful so change state with dispatch
    dispatch(ac.editStudent(updatedStudent.data));
    return updatedStudent.data;
  } catch(err) {
    console.error(err);
  }
};

// Single Student
// THUNK CREATOR:
export const fetchStudentThunk = id => async dispatch => {  // The THUNK
  try {
    // API "get" call to get a specific student (based on "id") data from database
    let res = await axios.get(`/api/students/${id}`);  
    // Call Action Creator to return Action object (type + payload with student data)
    // Then dispatch the Action object to Reducer to display student data 
    dispatch(ac.fetchStudent(res.data));
  } catch(err) {
    console.error(err);
  }
};

export const unenrollStudentThunk = (studentId) => async (dispatch, getState) => {
  try {
    const student = getState().allStudents.find(s => s.id === studentId);
    if (!student) throw new Error("Student not found");

    const updatedStudent = { ...student, campusId: null };
    const res = await axios.put(`/api/students/${studentId}`, updatedStudent);
    dispatch(ac.editStudent(res.data));

    // Optionally refresh the campus data
    const campusId = getState().campus.id;
    dispatch(fetchCampusThunk(campusId));
  } catch (err) {
    console.error(err);
  }
};

