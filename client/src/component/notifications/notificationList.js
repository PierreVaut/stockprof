import React from 'react';
import { connect } from 'react-redux';
import NotificationItem from './notificationItem';
import { Loader } from '../common';

const NotificationList = ({ account }) => {
  const { notifications } = account;
  return (
    <div className="list-item">
      {notifications ? notifications.map(notif => <NotificationItem {...notif} />) : <Loader />}
    </div>
  );
};

const mapStateToProps = state => state.dataReducer;


export default connect(mapStateToProps, null)(NotificationList);

