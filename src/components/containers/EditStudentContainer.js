/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { editStudentThunk, fetchStudentThunk } from "../../store/thunks";
import EditStudentView from "../views/EditStudentView";

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      campusId: "",
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: "",
      gpa: 0,
      redirect: false,
      redirectId: "",
    };
  }

  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.fetchStudent(this.props.match.params.id);
    }

    if (
      prevProps.student.id !== this.props.student.id &&
      this.props.student.id
    ) {
      this.setState({
        id: this.props.student.id,
        campusId: this.props.student.campusId || "",
        firstname: this.props.student.firstname || "",
        lastname: this.props.student.lastname || "",
        email: this.props.student.email || "",
        imageUrl: this.props.student.imageUrl || "",
        gpa: this.props.student.gpa || 0,
        redirect: false,
        redirectId: this.props.student.id || "",
      });
    }
  }

  // Capture input data when it is entered
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Take action after user click the submit button
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.

    let student = {
      id: this.state.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      gpa: this.state.gpa,
      campusId: this.state.campusId,
    };

    // Add new student in back-end database
    let editedStudent = await this.props.editStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: "",
      gpa: "",
      campusId: null,
      redirect: true,
      redirectId: editedStudent.id,
    });
  };

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView
          values={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student,
  };
};

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
  };
};

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);
