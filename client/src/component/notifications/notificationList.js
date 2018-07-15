import React from 'react';
import { connect } from 'react-redux';
import NotificationItem from './notificationItem';


const NotificationList = () => {
  console.log('truc');
  return (
    <div className="list-item">
      <NotificationItem />
    </div>
  );
};

const mapStateToProps = state => state.dataReducer;


export default connect(mapStateToProps, null)(NotificationList);

