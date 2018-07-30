import React from 'react';
import { connect } from 'react-redux';
import { toggleVisibility } from '../../actions/';

const Subheader = (props) => {
  if (props.dataReducer && props.dataReducer.account && props.dataReducer.account.isLogged && props.viewReducer.visible.subheader) {
    return (
      <div className="subHeader">
        <span className="subHeader-close" onClick={() => props.onClick()}> X </span>
        <div className="subHeader-content">
          <p>Hello {(props.dataReducer && props.dataReducer.account && props.dataReducer.account.isLogged) ? props.dataReducer.account.name : 'Guest'}</p>
          <p>Last visit: {(props.dataReducer && props.dataReducer.session && props.dataReducer.session.visitLast) ?
                        new Date(props.dataReducer.session.visitLast).toLocaleString() :
                        new Date(Date.now()).toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  return <div className="subHeader" id="notVisible" />;
};


const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(toggleVisibility('subheader'));
  },
});

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Subheader);

