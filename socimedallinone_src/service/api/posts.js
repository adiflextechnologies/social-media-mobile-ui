// https://socialmediaallinone.com/sma_admin/rest-api//v100/user_graphics
const API_KEY = '8e90d71140a94bb';

const getPosts = ({post, get}) => {
  const getFrames = params => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'API-KEY': API_KEY,
      },
    };
    return post(`/user_graphics`,params, config);
  };

  return {
    getFrames,
  };
};

export default getPosts;
