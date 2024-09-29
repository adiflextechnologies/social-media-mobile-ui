const API_KEY = '8e90d71140a94bb';

const getAuth = ({post}) => {
  const sendOtp = params => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'API-KEY': API_KEY,
      },
    };

    return post('/sendotp', params, config);
  };

  const signUp = params => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'API-KEY': API_KEY,
      },
    };

    return post('/signup', params, config);
  };

  const update = params => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'API-KEY': API_KEY,
      },
    };

    return post('/update_profile2', params, config);
  };

  const deleteProfile = params => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'API-KEY': API_KEY,
      },
    };

    return post('/delete_profile', params, config);
  };

  return {
    sendOtp,
    signUp,
    update,
    deleteProfile,
  };
};

export default getAuth;
