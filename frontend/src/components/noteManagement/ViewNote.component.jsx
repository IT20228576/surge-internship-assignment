import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewNote = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  /**
   * If the user confirms the deletion, then delete the note from the database and navigate to the home
   * page.
   * @returns The deleteNote function is being returned.
   */
  const deleteNote = async () => {
    try {
      /* A JavaScript function that displays a dialog box with a message and two buttons, OK and Cancel. */
      if (!window.confirm("Are you sure you wish to delete this note?")) {
        return;
      }

      /* Deleting the note from the database. */
      const result = await axios.delete(
        "http://localhost:8000/notes/delete/" + state._id
      );

      /* Checking if the status of the result is 201, if it is then it is alerting the user that the
      note has been deleted and then navigating the user to the home page. */
      if (result?.status === 201) {
        alert(result?.data?.Message);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  /**
   * When the user clicks on the update button, the user will be navigated to the update-note page, and
   * the state will be passed along.
   */
  const updateNote = () => {
    navigate("/update-note", { state: state });
  };

  return (
    <div className="list">
      <div className="list-sub-table">
        <div className="head">
          <h1>{state.title}</h1>
        </div>
        <hr />
        <p>{state.description}</p>
        <hr />
        <div className="head">
          <button className="btn btn-primary note-button" onClick={updateNote}>
            Edit
          </button>

          <button className="btn btn-danger note-button" onClick={deleteNote}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
