import React, { Component, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { getAuthToken, getAuthUser } from "../components/auth";
import { Box } from "@mui/material";
import { HOST } from "../const";
import axios from "axios";

class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: undefined,
    };
  }
  options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Taipei", // Taiwan Time
  };
  columns = [
    {
      accessorKey: "username",
      header: "Username",
      muiTableHeadCellProps: { sx: { color: "black" } },
      Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
    },
    {
      accessorKey: "action",
      header: "Action",
      muiTableHeadCellProps: { sx: { color: "black" } },
      Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
    },
    {
      accessorKey: "comments",
      header: "Comments",
      muiTableHeadCellProps: { sx: { color: "black" } },
      Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
    },
    {
      accessorKey: "postid",
      header: "Post Id",
      muiTableHeadCellProps: { sx: { color: "black" } },
      Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
    },
    {
      accessorKey: "postTitle",
      header: "Post Title",
      muiTableHeadCellProps: { sx: { color: "black" } },
      Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
    },
    {
      accessorKey: "time",
      header: "Time",
      muiTableHeadCellProps: { sx: { color: "black" } },
      Cell: ({ renderedCellValue }) => (
        <strong>
          {new Date(renderedCellValue).toLocaleString("en-US", this.options)}
        </strong>
      ),
    },
  ];
  fetchData() {
    axios
      .get(`http://${HOST}:8080/log`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
      .then((res) => {
        this.setState({
          logs: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response || err);
      });
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <>
        {this.state.logs ? (
          <div>
            <MaterialReactTable columns={this.columns} data={this.state.logs} />
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default Log;
