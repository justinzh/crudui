import api, {key_name, key_value} from "./api";

export const createPod = (pod) => {
    return (dispatch, getState) => {
        const {name, type, description} = pod;
        const payload = `
            mutation { 
                createPod(name:"${name}", type:"${type}", description:"${description}") { 
                    id 
                    name 
                    type 
                    description 
                    creation_time 
                } 
            }`

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json', [key_name]:key_value},
            body: JSON.stringify({query:payload})
        };

        fetch(api, requestOptions)
            .then(res => res.json())
            .then(data => {
                if(data.errors)
                    dispatch({type: 'CREATE_POD_ERROR', err: data.errors});
                else
                {
                    console.log(data);
                    dispatch({type: 'CREATE_POD', pod: data.data.createPod});
                }
            })
            .catch((err)=> {
                dispatch({type: 'CREATE_POD_ERROR', err})
            });
    }
};

export const searchPod = (query) => {
    return (dispatch, getState) => {
        let state = getState();
        console.log("state in search action", state);

        const payload = `
            query { 
                searchPod(${query.category}:"${query.input}", sortkey:"${query.sortkey}", descending: ${query.descending}) { 
                    id 
                    name 
                    type 
                    description 
                    creation_time 
                }
            }`
        console.log(payload);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json', [key_name]:key_value},
            body: JSON.stringify({query:payload})
        };
        fetch(api, requestOptions)
            .then(res => res.json())
            .then(data => {
                const pods = {pods: data.data.searchPod};
                dispatch({type: 'SEARCH_POD', pods });
            })
            .catch((err) => dispatch({type: 'SEARCH_POD_ERROR'}, err));
    }
};

export const updatePod = (pod) => {
    return (dispatch, getState) => {
        var {id, name, type, description} = pod;

        const payload = `
            mutation { 
                updatePod(id: "${id}", name:"${name}", type:"${type}", description:"${description}") { 
                    id 
                    name 
                    type 
                    description 
                    creation_time 
                }
            }`

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json', [key_name]:key_value},
            body: JSON.stringify({query:payload})
        };

        fetch(api, requestOptions)
            .then(res => res.json())
            .then(data => {
                const upod = data.data.updatePod;
                dispatch({type: 'UPDATE_POD', pod: upod});
            })
            .catch((err) => dispatch({type: 'UPDATE_POD_ERROR'}, err));
    }
};

export const deletePod = (id) => {
    return (dispatch, getState) => {
        const payload = `
            mutation { 
                deletePod(id:"${id}") 
            }`

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json', [key_name]:key_value},
            body: JSON.stringify({query:payload})
        };

        fetch(api, requestOptions)
            .then(res => res.json())
            .then(data => {
                const upod = data.data.updatePod;
                dispatch({type: 'UPDATE_POD', upod});
            })
            .catch((err) => dispatch({type: 'UPDATE_POD_ERROR'}, err));
    }
};

export const loggedIn = (login) => {
    return (dispatch, getState) => {
        console.log('logged-in:', login);

        dispatch({type: 'LOGGEN_IN', login})
    }

}