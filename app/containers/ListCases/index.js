/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import {initialState} from "../OpenCase/reducer";
import {connect} from "react-redux";

class ListCases extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      data: Object.values(this.props.cases),
    };
  }

  render() {
    const columns = [
      {
        Header: 'ID',
        accessor: 'id', // String-based value accessors!
      },
      {
        Header: 'Party 1',
        accessor: 'party1', // String-based value accessors!
      },
      {
        Header: 'Party 2',
        accessor: 'party2',
      },
      {
        Header: 'State',
        accessor: 'state',
        Cell: ({ row }) => (
          <Link to={`${row.state === 'pending' ? 'accept' : 'show'}/${row.id}`}>
            {row.state}
          </Link>
        ),
      },
    ];

    return (
      <ReactTable
        data={this.state.data}
        columns={columns}
        getTdProps={(state, rowInfo, column, instance) => ({
          onClick: (e, handleOriginal) => {
            console.log('A Td Element was clicked!');
            console.log('it produced this event:', e);
            console.log('It was in this column:', column);
            console.log('It was in this row:', rowInfo);
            console.log('It was in this table instance:', instance);

            // IMPORTANT! React-Table uses onClick internally to trigger
            // events like expanding SubComponents and pivots.
            // By default a custom 'onClick' handler will override this functionality.
            // If you want to fire the original onClick handler, call the
            // 'handleOriginal' function.
            if (handleOriginal) {
              handleOriginal();
            }
          },
        })}
      />
    );
  }
}


function mapStateToProps(state) {
  console.log(222, state);
  return {
    cases: state.get('cases', initialState).cases,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListCases);

