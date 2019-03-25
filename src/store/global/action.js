import { createAction } from 'redux-actions';


export const global_UPDATE_STATE = createAction('global_UPDATE_STATE');

export const global_SHOW_MODAL = (modalContent) => (dispatch) => {
    return dispatch(global_UPDATE_STATE({
        showModal: true,
        modalContent: modalContent,
    }));
};
export const global_HIDE_MODAL = () => (dispatch) => {
    return dispatch(global_UPDATE_STATE({
        showModal: false,
        modalContent: null,
    }));
};
