/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */

/*
7. can navigate to the Single Student View, and
○ see details about a single student, with all data fields, including the campus at which the student
is enrolled (if exists)
○ see an informative message if the student is not enrolled at a campus
○ navigate to the Single Campus View of the student's enrolled campus
○ navigate to the Edit Student View and edit the student's information
○ delete the student (e.g., via link/button and optionally, this can be part of the All Students View)
*/

import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>

      <Link to={`/campus/${student.campus.id}`}> <h2>{student.campus.name}</h2> </Link>
          
      <h3>GPA: {student.gpa}</h3>
      <h3>{student.email}</h3>

      <img 
          src={student.url} 
          alt={student.name} 
        />

    </div>
  );

};

export default StudentView;