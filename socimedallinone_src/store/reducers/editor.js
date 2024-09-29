
import {
	ADD_FRAME,
	ADD_PHOTO,
	ADD_TEXT,
	CHANGE_X,
	REMOVE_ACTIVE_ITEM,
	REMOVE_FRAME,
	REMOVE_PHOTO,
	REMOVE_TEXT,
	SET_ACTIVE_ITEM,
	SET_BACKGROUND_SIZE,
	SET_EDITOR_VALUES,
	SET_FRAME,
	UPDATE_IMAGE_STYLE,
	UPDATE_TEXT_STYLE,
	CHANGE_TEXT_POSITION,
	CHANGE_IMAGE_POSITION,
	SET_UPDATE_TEXT,
	SET_UPDATED_TEXT,
	SET_UPDATE_PHOTO,
	SET_UPDATED_PHOTO,
	ADD_CANVAS,
	UPDATE_CANVAS_STYLE,
	PASS_CANVAS_ACTIONS,
	SET_UPDATED_CANVAS,
	SET_BACK_IMAGES,
	REMOVE_BACK_IMAGES,
	ADD_BACKGROUND_REMOVED_IMAGE,
	TOGGLE_AI_IMAGE
} from '../actionsTypes';

const typeConst = {
    STICKER: "STICKER",
    TEXT: "TEXT",
    PHOTO: "PHOTO",
    USER_PHOTO: "USER_PHOTO",
    USER_TEXT: "USER_TEXT",
    CANVAS: "CANVAS"
}


const initState = {
	frames: [],
	isFrameLoading: false,
	frame: null,
	zIndex: 100,
	imgSize: {},
	texts: [],
	images: [],
	backImages: [],

	canvas: null,
	activeItem: {},
	activePosition: {
		count: 1
	},
	updateText: {},
	updatePhoto: {},
	canvasActions: {}
};

const editorReducer = (state = initState, action) => {
	const { zIndex = 100 } = state || {};

	switch (action.type) {
		case SET_FRAME:
			return {
				...state,
				frames: action.payload,
				isFrameLoading: false
			};
		case ADD_BACKGROUND_REMOVED_IMAGE:
			const isImgActiveItem = state.activeItem.id;

			const { list, aiImgUri } = addRemoveBackgroundImg(
				state.images,
				action.payload.aiImgUri,
				action.payload.id,
				state.activeItem
			);

			if (
				isImgActiveItem === action.payload.id &&
				state.activeItem.isAiLoading
			) {
				return {
					...state,
					images: list,
					activeItem: {
						...state.activeItem,
						data: aiImgUri,
						isAiImg: true,
						isAiLoading: false
					}
					// updatePhoto: {}
				};
			}

			return {
				...state,
				images: list
				// updatePhoto: {}
			};
		case ADD_FRAME:
			return {
				...state,
				frame: action.payload
			};
		case CHANGE_TEXT_POSITION:
		case CHANGE_IMAGE_POSITION:
			const count = state.activePosition?.count || 1;
			const idPosi = state.activeItem.id;

			return {
				...state,
				activePosition: {
					count: count + 1,
					[idPosi]: updatePositon(action.payload)
				}
			};

		case SET_UPDATE_TEXT:
			const idUpdate = state.activeItem.id;
			return {
				...state,
				updateText: {
					id: idUpdate,
					data: state.texts.find((item) => item.id === idUpdate).data
				}
			};

		case SET_UPDATE_PHOTO:
			const idPhotoUpdate = state.activeItem.id;
			return {
				...state,
				updatePhoto: {
					id: idPhotoUpdate,
					data: state.images.find((item) => item.id === idPhotoUpdate)
						.data
				}
			};
		case UPDATE_TEXT_STYLE:
			return {
				...state,
				texts: updateStyleItem(
					state.texts,
					action.payload,
					state.activeItem.id
				)
			};
		case SET_UPDATED_TEXT:
			return {
				...state,
				texts: updateData(
					state.texts,
					action.payload.data,
					action.payload.id
				),
				updateText: {}
			};
		case SET_UPDATED_CANVAS:
			return {
				...state,
				canvas: updateData(
					state.canvas,
					action.payload.data,
					action.payload.id
				),
				updatePhoto: {}
			};
		case SET_UPDATED_PHOTO:
			return {
				...state,
				images: updateData(
					state.images,
					action.payload.data,
					action.payload.id
				),
				activeItem: {
					...state.activeItem,
					data: action.payload.data,
					isAiImg: false,
					isAiLoading: false
				},
				updatePhoto: {}
			};
		case UPDATE_IMAGE_STYLE:
			return {
				...state,
				images: updateStyleItem(
					state.images,
					action.payload,
					state.activeItem.id
				)
			};
		case UPDATE_CANVAS_STYLE:
			return {
				...state,
				canvas: {
					...state.canvas,
					style: {
						...state.canvas.style,
						...action.payload.style
					}
				}
			};

		case ADD_TEXT:
			const { texts } = state || {};
			const idText = action.payload.id;
			const newTexts = addItem(texts, zIndex, action.payload);
			return {
				...state,
				texts: newTexts,
				activeItem: {
					[idText]: true,
					type: typeConst.TEXT,
					id: idText,
					style: { zIndex },
					data: action.payload.data
				},
				zIndex: zIndex + 1
			};

		case ADD_PHOTO:
			const idPhoto = action.payload.id;

			return {
				...state,
				images: addItem(state.images, zIndex, action.payload),
				activeItem: {
					[idPhoto]: true,
					type: typeConst.PHOTO,
					id: idPhoto,
					style: { zIndex },
					data: action.payload.data,
					isAiImg: false,
					isAiLoading: false
				},
				zIndex: zIndex + 1
			};
		case PASS_CANVAS_ACTIONS:
			return {
				...state,
				canvasActions: action.payload
			};

		case ADD_CANVAS:
			const idCanvas = action.payload.id;
			const canvasState = state.canvas;

			return {
				...state,
				canvas: {
					...canvasState,
					...action.payload,
					style: {
						zIndex,
						...canvasState?.style,
						...action.payload.style
					}
				},
				activeItem: {
					[idCanvas]: true,
					type: typeConst.CANVAS,
					id: idCanvas,
					style: { zIndex, ...action.payload.style },
					data: action.payload.data
				},
				zIndex: zIndex + 1
			};

		case SET_ACTIVE_ITEM:
			const idSAI = action.payload.id;
			const activeType = action.payload.type;
			const style = action.payload.style;
			const activeData = action.payload.data;
			let activeItemData = {
				[idSAI]: true,
				type: activeType,
				id: idSAI,
				style,
				data: activeData
			};

			if (action.payload.restData) {
				activeItemData = {
					...activeItemData,
					...action.payload.restData
				};
			}

			return {
				...state,
				activeItem: activeItemData
			};
		case REMOVE_ACTIVE_ITEM:
			return {
				...state,
				activeItem: {}
			};
		case REMOVE_TEXT:
			return {
				...state,
				texts: removeItem(state.texts, action.payload)
			};
		case REMOVE_PHOTO:
			return {
				...state,
				images: removeItem(state.images, action.payload)
			};
		case SET_BACK_IMAGES:
			return {
				...state,
				backImages: [...state.backImages, action.payload]
			};
		case REMOVE_BACK_IMAGES:
			return {
				...state,
				backImages: removeItem(state.backImages, action.payload)
			};

		case REMOVE_FRAME:
			return {
				...state,
				frame: null
			};
		case SET_EDITOR_VALUES:
			return {
				...state,
				...action.payload
			};
		case SET_BACKGROUND_SIZE: {
			return {
				...state,
				imgSize: action.payload
			};
		}
		case TOGGLE_AI_IMAGE: {
			const { list, newUri, isAiImg, isAiLoading } = toggleAiImg(
				state.images,
				action.payload.id
			);

			if (isAiLoading) {
				return {
					...state,
					activeItem: {
						...state.activeItem,
						isAiLoading: isAiLoading
					}
				};
			}

			return {
				...state,
				images: list,
				activeItem: {
					...state.activeItem,
					data: newUri,
					isAiImg: isAiImg,
					isAiLoading: false
				}
			};
		}
		default:
			return state;
	}
};

const addItem = (data = [], zIndex = 100, item) => {
	const newReq = {
		...item,
		style: {
			zIndex: zIndex,
			...item.style
		}
	};

	return [...data, newReq];
};

const removeItem = (data = [], item) => {
	const id = item.id;
	const list = [...data];
	const index = list.findIndex((item) => item.id === id);
	list.splice(index, 1);

	return [...list];
};

const updateStyleItem = (data = [], item, id) => {
	const list = data.map((elem) => {
		if (elem.id === id) {
			return {
				...elem,
				style: {
					...elem.style,
					...item.style
				}
			};
		}

		return elem;
	});
	return list;
};

const updateData = (data = [], item, id) => {
	const list = data.map((elem) => {
		if (elem.id === id) {
			return {
				...elem,
				data: item,
				aiImg: '',
				isAiImg: false,
				isAiLoading: false
				// isAiImgLoading: true
			};
		}

		return elem;
	});
	return list;
};

const addRemoveBackgroundImg = (data = [], item, id, activeItem) => {
	let aiImgUri = '';

	const list = data.map((elem) => {
		if (elem.id === id) {
			if (activeItem.id === id && activeItem.isAiLoading) {
				aiImgUri = item;
				return {
					...elem,
					orgUri: elem.data,
					data: item,
					aiImg: item,
					isAiImg: true,
					isAiLoading: false
				};
			}

			return {
				...elem,
				aiImg: item,
				isAiImg: false,
				isAiLoading: false
			};
		}

		return elem;
	});
	return { list, aiImgUri };
};

const toggleAiImg = (data = [], id) => {
	let newUri = '';
	let isAiLoading = false;
	let isAiImg = false;
	const list = data.map((elem) => {
		if (elem.id === id) {
			// console.log('==> ', elem);
			if (elem.data === elem.aiImg) {
				newUri = elem.orgUri;
				isAiImg = false;
				return {
					...elem,
					orgUri: null,
					data: elem.orgUri
				};
			}
			if (!elem.aiImg || elem.aiImg === '') {
				newUri = elem.data;
				isAiLoading = true;
				return {
					...elem
				};
			}
			newUri = elem.aiImg;
			isAiImg = true;

			return {
				...elem,
				orgUri: elem.data,
				data: elem.aiImg
			};
		}

		return elem;
	});
	return { list, newUri, isAiImg, isAiLoading };
};

const updatePositon = (item) => {
	let style = {};

	if (item.xValue != undefined) {
		style = {
			...style,
			x: item.xValue
		};
	}

	if (item.yValue != undefined) {
		style = {
			...style,
			y: item.yValue
		};
	}

	return style;
};

export default editorReducer;
