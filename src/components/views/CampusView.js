/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any). 
Fixed deletion
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, deleteCampus } = props;

  if (!campus || !campus.students || campus.students.length === 0) {
    return (
      <div>
        <h1>{campus.name}</h1>
        <h1>{campus.id}</h1>

        <img src={campus.imageUrl} alt={campus.name} />

        <p style={{ fontSize: "30px" }}>
          There are no students attending this school.
        </p>
        <Link to={`newstudent`}>
          <button style={{ fontSize: "20px" }}>Add New Student</button>
        </Link>
        <Link to={`/campus/${campus.id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => deleteCampus(campus.id)}>Delete</button>
      </div>
    );
  }

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.id}</p>
      <p>{campus.description}</p>

      <img src={campus.imageUrl} alt={campus.name} />

      <button onClick={() => deleteCampus(campus.id)}>Delete</button>
      <Link to={`/campus/${campus.id}/edit`}>
        <button>Edit</button>
      </Link>

      {campus.students.map((student) => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CampusView;
