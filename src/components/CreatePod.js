import React, { Component } from 'react'
import {connect} from 'react-redux'
import { createPod, searchPod } from '../podAction'

export class CreatePod extends Component {
    state = {
        name:'',
        type:'',
        description:''
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createPod(this.state);
        this.props.searchPod({});

        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <form onSubmit = {this.handleSubmit} className="white">
                    <h5 className="grey-text tex-darken-3">New Pod</h5>
                    <div className="input-field">
                        <label htmlFor="name">Name (max length:20)</label>                            
                        <input type="text" id="name" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="type">Type (4 char)</label>                            
                        <input type="text" id="type" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="description">Description (max length:250)</label>           
                        <textarea id="description" className="materialize-textarea" onChange={this.handleChange}></textarea>                 
                    </div>
                    <button className="btn pink lighten-1 z-depth-0" >Create</button>                 
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPod: (pod) => dispatch(createPod(pod)),
        searchPod: (query) => dispatch(searchPod(query))
    }
}
export default connect(null, mapDispatchToProps)(CreatePod)
