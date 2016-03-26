import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import {green, pink} from './Crates/CrateUtils';
import {Camera} from './ActionButtons';
import Hammer from 'react-hammerjs';
import {Motion, spring} from 'react-motion';
import $ from 'jquery';

var FIREBASE_URL = "https://burning-heat-5122.firebaseio.com";
var ref = new Firebase(FIREBASE_URL);
var authData = ref.getAuth();

var ActionBar = React.createClass({
  getInitialState: function() {
    return {
      isOpened: false,
      mainButtonPosition: 0,
      mainButtonWidth: 0,
      user: {}
    }
  },
  componentDidMount: function() {
    const calculatedPosition = $('.optionsMenu').position().left;
    const calculatedWidth = $('.optionsMenu').width();
    const itself = this;
    var user = ref.getAuth();
    var userRef;

    this.setState({
      mainButtonPosition: calculatedPosition,
      mainButtonWidth: calculatedWidth
    });

    userRef = ref.child('users').child(user.uid);
    userRef.once('value', function (snap) {
      user = snap.val();
      if (!user) {
        return;
      }
      itself.setState({user: user});
    });
  },
  openAction: function() {
    var isOpened = !this.state.isOpened
    isOpened ? this.setState({isOpened: true}) : this.setState({isOpened: false})
  },
  initPos: function() {
    return {
      left: spring(this.state.mainButtonPosition, {stiffness: 220, damping: 17}),
      opacity: spring(0)
    }
  },
  finalPos: function(id) {
    return {
      left: spring(this.state.mainButtonPosition - (this.state.mainButtonWidth * id), {stiffness: 320, damping: 17}),
      opacity: spring(1)
    }
  },
  setBtnPosition: function(position) {
    const isOpened = !this.state.isOpened;
    return Object.assign({}, isOpened && this.initPos(), !isOpened && this.finalPos(position))
  },
  newCrate: function(event) {
    browserHistory.push("create");
  },
  render: function() {
    const isOpened = !this.state.isOpened;
    return (
      <footer className="homeFooter" style={styles.homeFooter}>
        <Hammer onTap={this.openAction} threshold={400}>
          <div className="optionsMenu actionButton animated pulse" style={styles.optionsMenu} onClick={this.newCrate}>
            <div className="actionIcon" style={styles.createIcon}></div>
            <div className="actionIcon" style={{fontSize: '2em', color: '#fff'}}>+</div>
          </div>
        </Hammer>
        <Motion style={this.setBtnPosition(1)}>
          {({left, opacity}) =>
            <div className="actionButton" style={{left: left, opacity: opacity}} >
              <div className="actionIcon" style={{top: '2.2em'}}>
                <Camera />
              </div>
            </div>}
        </Motion>
        <Motion style={this.setBtnPosition(2)}>
          {({left, opacity}) =>
            <div className="userButton actionButton" style={{left: left, opacity: opacity}}>
              <div className="actionIcon">
                <img className="user-avatar" style={{height: 50, borderRadius: '50%', marginTop: 7}} src={this.state.user.profileImageURL}/>
              </div>
            </div>}
        </Motion>
      </footer>
    )
  }
});

module.exports = ActionBar;

const styles = {
  homeFooter: {
    height: '4em',
    backgroundColor: green.lightColor// TODO: going to use the users color
  },
  optionsMenu: {
    position: 'absolute',
    top: '-2.5em',
    right: '2.5em',
    width: '5em',
    height: '5em',
    borderRadius: '50%',
    backgroundColor: '#fff',
    boxShadow: '1px 2px 4px 0px rgba(0,0,0,0.21)',
    zIndex: '100'
  },
  createIcon: {
    height: '2.5em',
    width: '2.5em',
    backgroundColor: pink.lightColor,
    borderRadius: 6
  },
  buttonStyle: {
    position: 'absolute',
    top: '-2em',
    width: '4em',
    height: '4em',
    borderRadius: '50%',
    backgroundColor: '#fff',
    boxShadow: '1px 2px 4px 0px rgba(0,0,0,0.21)',
  }
}

/*
This is how you add a button. Set the position with setBtnPosition(pos)
The main button is [0]. The position directly next to it is [1].
[2] is second and so forth.

<Motion style={this.setBtnPosition(pos)}>
  {({left, opacity}) =>
    <div className="actionButton" style={{left: left, opacity: opacity}}>
      <div className="actionIcon" style={{top: '2.2em'}}>
        ** ADD COMPONENT HERE **
        Ex. <Camera />
      </div>
    </div>}
</Motion>
*/