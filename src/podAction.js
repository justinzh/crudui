import api from "./api";

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
            mode: 'no-cors',
            body: JSON.stringify({query:payload})
        };

        fetch(api, requestOptions)
            .then(res => res.json())
            .then(data => dispatch({type: 'CREATE_POD', data}))
            .catch((err)=> {
                dispatch({type: 'CREATE_POD_ERROR', err})
            });
    }
};

export const searchPod = (query) => {
    return (dispatch, getState) => {
        console.log("query--->", query);

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

export const deletePod = (id) => {
    return (dispatch, getState) => {
        const payload = `
            mutation { 
                deletePod(id:"${id}") 
            }`

        const requestOptions = {
            method: 'POST',
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
