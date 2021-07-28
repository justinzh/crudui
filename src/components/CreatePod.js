import React, { Component } from 'react'
import M from 'materialize-css'
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
        
        let des = `${this.state.description} [created by ${this.props.user.name}]`;
        this.props.createPod({...this.state, description:des});
    }

    componentDidUpdate() {
        var elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems, {});
    }

    render() {
        // add logic to go to home page if created successfully
        let err = false;
        let errMsg = '';

        console.log('create-pod', this.props);

        if(!this.props.user) {
            return (
                <div className="container">
                    <form className="white">
                        <h5 className="grey-text tex-darken-3">New Pod</h5>
                        <button className="btn pink lighten-1 z-depth-0 grey" >Create</button>      
                        <div className="red-text">
                            Please login first
                        </div>           
                    </form>
                </div>
            )          
        }
        
        if(this.props.status.includes('CREATE_POD_ERROR')) {
            err = true;
            errMsg = 
                <ul className='collapsible'>
                    <li>
                        <div className="collapsible-header"><i className="material-icons">error</i>{this.props.status}</div>
                        <div className="collapsible-body">
                            <span>
                                {this.props.message.map(( msg, i ) => <span key={i}>{msg.message}</span>)}
                            </span>
                        </div>                     
                    </li>
                </ul>                             
        } else if(this.props.status.includes('CREATE_POD')) {
            this.props.history.push('/');
        }

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
                    <div className="red-text">
                        {err ? errMsg : null}
                    </div>           
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {status: state.status, message: state.message, user: state.login};
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPod: (pod) => dispatch(createPod(pod)),
        searchPod: (query) => dispatch(searchPod(query))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePod)
