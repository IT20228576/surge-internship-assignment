import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

const ViewUsers = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  let items = [];

  function customerList() {
    /* Returning the data in the form of a table. */
    return users.map((current, index) => {
      const name = current.firstName;
      const id = current.id;
      const email = current.email;
      /* Checking if the name contains the search string or if the search string is empty. */
      if (
        name?.toLowerCase().includes(search?.toLowerCase()) ||
        id?.toString().includes(search) ||
        email?.toLowerCase().includes(search?.toLowerCase()) ||
        search === ""
      ) {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{current.id}</td>
            <td>{current.firstName}</td>
            <td>{current.lastName}</td>
            <td>{current.email}</td>

            <td>
              <button className="btn btn-primary account-button-blue">
                View
              </button>
            </td>
          </tr>
        );
      }
    });
  }

  if (currentPage > 1) {
    items.push(
      <Pagination.Prev key="Prev" onClick={() => setCurrentPage(currentPage - 1)} />
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
          "http://localhost:8000/users/all?page=" + currentPage
        );
        setUsers(result?.data?.users);
        setTotalPage(result?.data?.total);
      } catch (error) {
        console.log(error);
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
        <a href="/create-user">
          <button className="account-button-blue-add">Create User</button>
        </a>
        <div className="head">
          <h1>Users</h1>
        </div>
        <hr />
        <Table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{customerList()}</tbody>
        </Table>
        <hr />
        <div className="head">
          <Pagination size="lg">{items}</Pagination>
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;
