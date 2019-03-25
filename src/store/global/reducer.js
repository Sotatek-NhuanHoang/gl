import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';


const defaultState = {
    // Modal state
    showModal: false,
    modalContent: null,
};


export const reducer = handleActions({
    global_UPDATE_STATE: (state, { payload }) => {
        return fromJS(state)
            .mergeDeep(payload)
            .toJS();
    },
}, defaultState);


export default reducer;
