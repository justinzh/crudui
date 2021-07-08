const initState = {};

const podReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CREATE_POD':
            console.log('create pod', action.pod);
            return state;
        case 'SEARCH_POD':
            console.log('search pods', action.pods);
            return action.pods;
        case 'CREATE_POD_ERROR':
            console.log('create pod error', action.err);
            return state;
        case 'UPDATE_POD':
            console.log('update pod', action.pod);
            return state;
        case 'UPDATE_POD_ERROR':
            console.log('update pod error', action.err);
            return state;
        case 'DELETE_POD':
            console.log('delete pod', action.pod);
            return state;
        case 'DELETE_POD_ERROR':
            console.log('delete pod error', action.err);
            return state;
        default:    
            return {...state};
    }

}

export default podReducer;