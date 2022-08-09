import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewNote = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const deleteNote = async () => {
    try {
      if (!window.confirm("Are you sure you wish to delete this note?")) {
        return;
      }

      await axios.delete("http://localhost:8000/notes/delete/" + state._id);

      navigate("/notes");
    } catch (err) {
      console.log(err);
    }
  };

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
          <button
            className="btn btn-primary note-button"
            onClick={updateNote}
          >
            Edit
          </button>

          <button
            className="btn btn-danger note-button"
            onClick={deleteNote}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
