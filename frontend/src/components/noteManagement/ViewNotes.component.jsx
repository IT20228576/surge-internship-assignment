import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";

const ViewNotes = () => {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  let items = [];

  const navigate = useNavigate();

  function customerList() {
    /* Returning the data in the form of a table. */
    // eslint-disable-next-line array-callback-return
    return notes.map((current, index) => {
      const title = current.title;
      /* Checking if the name contains the search string or if the search string is empty. */
      if (
        title?.toLowerCase().includes(search?.toLowerCase()) ||
        search === ""
      ) {
        return (
          <li key={index}>
            <div className="card">
              <div className="card-header">{current.title}</div>
              <div className="card-body">
                <p className="card-text">
                  {current.description?.toString()?.substring(0, 150)}....
                </p>
                <button
                  className="btn btn-primary account-button-blue"
                  onClick={viewNotes.bind(this, current)}
                >
                  View
                </button>
              </div>
            </div>
            <br></br>
          </li>
        );
      } else {
        return null;
      }
    });
  }

  function viewNotes(data) {
    navigate("/note", { state: data });
  }

  if (currentPage > 1) {
    items.push(
      <Pagination.Prev
        key="Prev"
        onClick={() => setCurrentPage(currentPage - 1)}
      />
    );
  }
  for (let number = 1; number <= totalPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (currentPage < totalPage) {
    items.push(
      <Pagination.Next
        key="Next"
        onClick={() => setCurrentPage(currentPage + 1)}
      />
    );
  }

  useEffect(() => {
    const getall = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8000/notes/all?page=" + currentPage
        );
        setNotes(result?.data?.notes);
        setTotalPage(result?.data?.total);
      } catch (error) {
        console.error(error);
      }
    };
    getall();
  }, [currentPage]);

  return (
    <div className="list">
      <div className="list-sub-table">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <a href="/create-note">
          <button className="btn btn-primary account-button-blue-add">
            Create note
          </button>
        </a>
        <div className="head">
          <h1>Notes</h1>
        </div>
        <hr />
        <ul>{customerList()}</ul>
        <hr />
        <div className="head">
          <Pagination size="lg">{items}</Pagination>
        </div>
      </div>
    </div>
  );
};

export default ViewNotes;
