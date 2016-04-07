import Firebase from 'firebase';
import {routerActions} from 'react-router-redux';

const fireRef = new Firebase("https://burning-heat-5122.firebaseio.com");
//TODO: read from redux instead!

//NOTE: use this action to listen to auth
export const startListeningToAuth = () => {
	return (dispatch, getState) => {
		fireRef.onAuth((authData) => {
			if (authData) {
				dispatch({
					type: 'LOGIN_USER',
					uid: authData.uid,
          provider: authData.provider,
          name: getName(authData),
          username: getUsername(authData),
          profileImageURL: getProfileImageURL(authData),
					data: authData,
					userColor: 'pink'
				});
				// dispatch(routerActions.push('/'));
			} else {
				if (getState().userAuth.currently !== 'ANONYMOUS') {
					dispatch({ type: 'LOGOUT' });
				}
			}
		});
	};
}

//NOTE: use this action to login
export const attemptLogin = (provider) => {
	return (dispatch, getState) => {
		if (provider === 'twitter') {
			dispatch({ type: 'ATTEMPTING_LOGIN' });
			fireRef.authWithOAuthPopup('twitter', (error) => {
				if (error) {
					dispatch({ type: 'DISPLAY_ERROR', error: 'Login failed! ' + error });
					dispatch({ type: 'LOGOUT' });
				}
			});
		}
	};
}

//NOTE: use this action to logout
export const logoutUser = () => {
	return (dispatch) => {
		dispatch({ type: 'LOGOUT' });
		fireRef.unauth();
	};
}

const getName = (authData) => {
  switch(authData.provider) {
    case 'twitter':
      return authData.twitter.displayName
    case 'facebook':
      return authData.facebook.displayName
  }
}

const getUsername = (authData) => {
  switch(authData.provider) {
    case 'twitter':
      return authData.twitter.username
    case 'facebook':
      return null
  }
}

const getProfileImageURL = (authData) => {
  switch(authData.provider) {
    case 'twitter':
      return authData.twitter.profileImageURL.replace("_normal", "")
    case 'facebook':
      return authData.facebook.profileImageURL
  }
}

const initialAuthState = {
  currently: 'ANONYMOUS',
  username: null,
  uid: null,
  provider: null,
  name: null,
  profileImageURL: null,
	profileColor: null,
	data: null
}

export default function userAuth(state = initialAuthState, action) {
	switch (action.type) {
		case 'ATTEMPTING_LOGIN':
			return {
				currently: 'AWAITING_AUTH_RESPONSE',
				username: 'guest',
				uid: null
			};
		case 'LOGOUT':
			return {
				currently: 'ANONYMOUS',
				username: 'guest',
				uid: null
			};
		case 'LOGIN_USER':
			return {
				currently: 'LOGGED_IN',
				username: action.username,
				uid: action.uid,
        provider: action.provider,
        name: action.name,
        profileImageURL: action.profileImageURL,
				data: action.data,
				profileColor: action.userColor
			};
		default: return state;
	}
};