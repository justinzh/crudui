import React, { Component } from 'react'
import PodRecord from './PodRecord'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { searchPod } from '../podAction';

class PodList extends Component {

    state = {id:false, type:false, description:false}
    componentDidMount(){
        this.props.searchPod({});
    }

    handleClick = (e) => {
        const query = {sortkey: e.target.name, descending: !this.state[e.target.name]}

        var new_state = this.state;
        new_state[e.target.name] = !this.state[e.target.name];
        this.setState(new_state);

        this.props.searchPod(query);
    }

    render() {
        const {pods} = this.props;
        return (
            <div className="container">
                <div className="section">
                <div className="row">
                    <div className="col s1"><button className="header" name="id" onClick = {this.handleClick}>id</button></div>
                    <div className="col s2"><button className="header" name="name" onClick = {this.handleClick}>name</button></div>
                    <div className="col s1"><button className="header" name="type" onClick = {this.handleClick}>type</button></div>
                    <div className="col s2"><button className="header" name="description" onClick = {this.handleClick}>description</button></div>
                </div>
                {pods && pods.map(pod => {
                    return <Link to = {'/pod/' + pod.id} key = {pod.id}>
                        <PodRecord pod = {pod} key = {pod.id}></PodRecord>
                    </Link>
                })}
            </div></div>
        )
    }
}
const mapDispatchToPros = (dispatch) => {
    return {
        searchPod: (query) => dispatch(searchPod(query))
    }    
}

const mapStateToProps = (state) => {
    return {
        pods: state.pods
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(PodList)

