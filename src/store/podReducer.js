const initState = {};

const podReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CREATE_POD':
            console.log('create pod', action.pod);
            return {...state, status:action.type}
        case 'SEARCH_POD':
            console.log('search pods', {...state, status:action.type, pods: action.pods});
            return {...state, pods: action.pods};
        case 'CREATE_POD_ERROR':
            console.log('create pod error', action.err);
            return {...state, status:action.type, message: action.err};
        case 'UPDATE_POD':
            console.log('update pod', action.pod);
            return {...state, status:action.type};
        case 'UPDATE_POD_ERROR':
            console.log('update pod error', action.err);
            return {...state};
        case 'DELETE_POD':
            console.log('delete pod', action.pod);
            return {...state, status:action.type};
        case 'DELETE_POD_ERROR':
            console.log('delete pod error', action.err);
            return {...state};
        case 'LOGGEN_IN':
            console.log('LOGGEN_IN', {...state, login:action.profile});
            return {...state, status:action.type, login:action.profile}
        default:    
            return {...state};
    }

}

export default podReducer;