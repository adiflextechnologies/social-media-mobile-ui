const PLAYER = "PLAYER";
const EDITOR = "EDITOR";
const UTILS = "UTILS";

const getAsyncType = (store: string, path: string) => {
  return {
    request: `${store}/${path}`,
    pending: `${store}/${path}/pending`,
    fulfilled: `${store}/${path}/fulfilled`,
    rejected: `${store}/${path}/rejected`,
  };
};

const storeTypes = {
  slice: { player: PLAYER, editor: EDITOR, utils: UTILS },
  async: {
    frames: getAsyncType(UTILS, "FRAMES"),
  },
};

export default storeTypes;
