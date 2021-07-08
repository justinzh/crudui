import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updatePod, deletePod } from '../podAction';

export class PodDetails extends Component {
    state = {
        id: this.props.pod.id,
        name: this.props.pod.name,
        type: this.props.pod.type,
        description: this.props.pod.description
    };

    id = this.props.match.params.id;

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(e.nativeEvent.submitter.name==='update') {
            console.log(this.state);
            this.props.updatePod(this.state);
            this.props.history.push('/');
        }
        else {
            this.props.deletePod(this.id)
            this.props.history.push('/');
        }
    }

    render() {
        const pod = this.props.pod;

        var formcontent = pod ? 
                <form onSubmit = {this.handleSubmit} className="white">
                    <h5 className="grey-text tex-darken-3">{"Pod Id:" + pod.id + " created on 7/1/2021" }</h5>
                    <div className="input-field">
                        <label htmlFor="name">{pod.name}</label>                            
                        <input type="text" id="name" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="type">{pod.type}</label>                            
                        <input type="text" id="type" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="description">{pod.description}</label>           
                        <textarea id="description" className="materialize-textarea" onChange={this.handleChange}></textarea>                 
                    </div>
                    <div className="row">
                        <div className="col s12 m6"><button className="btn pink lighten-1 z-depth-0" name="update">Update</button></div>
                        <div className="col s12 m6"><button className="btn pink lighten-1 z-depth-0" name="delete">Delete</button></div>  
                    </div>         
                </form> : <div>The Pod is missing... please go back to the home page.</div>
        return (
            <div className="container">
                {formcontent}
            </div>
        )
    }
}

const mapStateToProps  = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const pods = state.pods;
    const pod = pods ? pods.find(e => e.id===id) : null;
    console.log('mapstate', pod, pods, id);
    return {pod: pod};
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePod: (pod)=> dispatch(updatePod(pod)),
        deletePod: (id) => dispatch(deletePod(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PodDetails)
