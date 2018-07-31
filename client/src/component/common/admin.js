import React from 'react';
import { connect } from 'react-redux';


// Top-security component^^
const Admin = (props) => {
  if (
    (
      props.account.name === 'admin'
        && props.account.email === 'admin'
    ) ||
        (
          props.account.name === '00'
        && props.account.email === '00'
        )
  ) {
    return (
      <div className="admin">
        <p>Data: {JSON.stringify(props)}</p>
        <button>Disconnect every user!</button>
      </div>
    );
  }

  return <p>Sorry {(props.account.name) ? props.account.name : 'Guest'}, you cannot see this page</p>;
};
const mapStateToProps = state => state.dataReducer;

export default connect(mapStateToProps)(Admin);
