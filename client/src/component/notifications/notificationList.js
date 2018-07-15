import React from 'react';
import { connect } from 'react-redux';
import NotificationItem from './notificationItem';

import {
  markAsRead as markAsReadAC,
  flushNotifs as flushNotifsAC,
} from '../../actions/';

const NotificationList = ({ account, markAsRead, flushNotifs }) => {
  const { notifications, _id } = account;
  const newNotifications = notifications ? notifications.filter(notif => notif.status === 'new').length > 0 : false;
  return (
    <div className="list-item">
      <button
        className={newNotifications ? 'large-button' : 'large-button-disabled'}
        onClick={
          () => { markAsRead(_id); }}
      >Marquer comme lu
      </button>
      <button
        className={notifications && notifications.length > 0 ? 'large-button' : 'large-button-disabled'}
        onClick={
          () => { flushNotifs(_id); }}
      >Tout supprimer
      </button>
      {notifications && notifications.length > 0 ? notifications.map(notif => <NotificationItem {...notif} key={notif._id} />) : 'Aucune notification à afficher'}
    </div>
  );
};

const mapStateToProps = state => state.dataReducer;
const mapDispatchToProps = dispatch => ({
  markAsRead: (id) => dispatch(markAsReadAC(id)),
  flushNotifs: (id) => dispatch(flushNotifsAC(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);

