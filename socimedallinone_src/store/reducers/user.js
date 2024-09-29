import {
  SET_LOGGED_IN_USER,
  SET_PROFILE,
  SET_LOGOUT,
} from '../actionsTypes';

const initState = {
  user: null,
  userid: null,
  isAuth: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        userid: action.payload,
        isAuth: !!action.payload,
      };
    case SET_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    // case UPDATE_PROFILE:
    //   let updatedUser = Object.assign({}, state.user)
    //   updatedUser.performer.profile_visuals.photo.preview_url = action.payload;
    //   return {
    //     ...state,
    //     user: {...updatedUser},
    //   };
    case SET_LOGOUT:
      return {
        userid: null,
        isAuth: false,
        user: null,
      };

    default:
      return state;
      break;
  }
};

export default userReducer;
