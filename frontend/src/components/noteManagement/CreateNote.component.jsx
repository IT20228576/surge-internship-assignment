import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../form.css";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /**
   * When the user clicks the submit button, prevent the default action, then send a POST request to the
   * server with the note details, and if successful, navigate to the home page.
   */
  const createNote = async (e) => {
    e.preventDefault();
    try {
      /* Creating an object with the title and description. */
      const CreateNoteData = {
        title,
        description,
      };

      /* Setting the loading state to true. */
      setLoading(true);

      /* Sending a POST request to the server with the note details. */
      const result = await axios.post(
        "http://localhost:8000/notes/create",
        CreateNoteData
      );

      /* This is checking if the status code is 201, which means that the note was created
      successfully. If it is, then it will set the loading state to false, alert the user that the
      note was created successfully, and navigate to the home page. */
      if (result?.status === 201) {
        setLoading(false);
        alert(result?.data?.Message);
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      console.error(err?.response?.data?.errorMessage);
      alert(err?.response?.data?.errorMessage);
    }
  };

  return (
    <div className="main-note">
      <div className="sub-main">
        <h1>Create Note</h1>
        <hr />
        <form onSubmit={createNote}>
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="form-control"
              />
          </div>
          <div>
            <label>Description</label>
            <textarea
              type="text"
              rows="10"
              required
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="form-control"
            />
          </div>
          <div>
            <button className="button" type="submit">
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-m"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Creating...</span>
                </>
              ) : (
                "Create Note"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
