import React, { Component, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";

//simple data example - Check out https://www.material-react-table.com/docs/examples/remote for a more complex example


class Form extends Component {
  columns = [
    {
      accessorKey: "name",
      header: "Name",
      muiTableHeadCellProps: { sx: { color: "green" } },
      Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>
    },
    {
      accessorFn: (row) => row.age,
      id: "age",
      header: "Age",
      Header: <i style={{ color: "red" }}>Age</i>
    }
  ];

  data = [
    {
      name: "John",
      age: 30
    },
    {
      name: "Sara",
      age: 25
    }
  ]; // Add your data here

  render() {
    return <MaterialReactTable columns={this.columns} data={this.data} />;
  }
}

export default Form;