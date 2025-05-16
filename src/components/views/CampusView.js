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

  if (!campus || !campus.students) return null;

  const hasStudents = campus.students.length > 0;

  return (
    <div>
      <h1>{campus.name}</h1>
      <p><strong>ID:</strong> {campus.id}</p>
      <p><strong>Address:</strong> {campus.address}</p>
      <p><strong>Description:</strong> {campus.description}</p>

      {!hasStudents && campus.imageUrl && campus.imageUrl.trim() && (
        <img
          src={campus.imageUrl}
          alt="Campus"
          style={{ width: "150px", height: "100px", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = "none";
          }}
        />
      )}


      {!hasStudents ? (
        <p style={{ fontSize: "30px" }}>
          There are no students attending this school.
        </p>
      ) : (
        <>
          <h3>Students:</h3>
          {campus.students.map((student) => (
            <div key={student.id} style={{ marginBottom: "10px" }}>
              <Link to={`/student/${student.id}`}>
                <h2>{student.firstname + " " + student.lastname}</h2>
              </Link>
              <button onClick={() => props.deleteStudent(student.id)}>
                Unenroll
              </button>
            </div>
          ))}
        </>
      )}

      <Link to={`/newstudent`}>
        <button style={{ fontSize: "20px" }}>Add New Student</button>
      </Link>
      <Link to={`/campus/${campus.id}/edit`}>
        <button>Edit</button>
      </Link>
      <button onClick={() => deleteCampus(campus.id)}>Delete</button>
    </div>
  );
};


export default CampusView;
