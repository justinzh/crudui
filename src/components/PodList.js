import React, { Component } from 'react'
import PodRecord from './PodRecord'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { searchPod } from '../podAction';

class PodList extends Component {
    state = {
        category:'name', 
        input:'', 
        sortkey:'name', 
        descending:false, id:false, type:false, description:false}

    componentDidMount(){
        this.props.searchPod({
                category:'name',
                input:"",
                sortkey:'id',
                descending: false
            });
    }

    handleClick = (e) => {
        let sortkey = 'name';
        if(e.target.name!=='search')
            sortkey = e.target.name;

        let query = {
                category: this.state.category, 
                input: this.state.input,
                sortkey: sortkey, 
                descending: !this.state.descending
            }
        
        this.props.searchPod(query);

        var new_state = this.state;
        if(e.target.name!=='search') {
            new_state.sortkey = e.target.name;
            new_state.descending = !this.state.descending;
        }

        this.setState({...new_state});
    }

    handleChange = (e) => {
        const id = e.target.id;
        const input = e.target.value;

        if(id==='searchfield') {
            const newState = {input: input};
            this.setState({...newState});
        } else if(id==='category') {
            const newState = {category: input};
            this.setState({...newState})
        }
    }

    render() {
        const {pods} = this.props;
        return (
            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col s1"><button className="header input-field" name="id" onClick = {this.handleClick}>id</button></div>
                        <div className="col s2"><button className="header input-field" name="name" onClick = {this.handleClick}>name</button></div>
                        <div className="col s1"><button className="header input-field" name="type" onClick = {this.handleClick}>type</button></div>
                        <div className="col s2"><button className="header input-field" name="description" onClick = {this.handleClick}>description</button></div>
                        <div className="col s1">
                            <button className="input-field" name='search' onClick = {this.handleClick}>search</button>
                        </div>
                        <div className="col s2" >
                            <input className="input-field" type="text" id="searchfield" onChange = {this.handleChange}/>
                        </div>
                        <div className="col s1"><button className="input-field header">on</button></div>                     
                        <div className="col s2"> 
                            <select className="header" id = "category" onChange = {this.handleChange}>
                                <option value="Name">name</option>
                                <option value="type">type</option>
                                <option value="description">description</option>
                            </select>
                        </div>
                    </div>

                    {pods && pods.map(pod => {
                        return <Link to = {'/pod/' + pod.id} key = {pod.id}>
                            <PodRecord pod = {pod} key = {pod.id}></PodRecord>
                        </Link>
                    })}
                </div>
            </div>
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

