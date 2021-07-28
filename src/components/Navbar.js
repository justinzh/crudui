import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import M from 'materialize-css'

const Navbar = (props) => {
 
    useEffect(() => {
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems, {});
    });

    const {user} = props;

    return (
        <nav className="nav-wrapper grey darken-3" style = {{paddingTop:'5px'}}>
            <div className="container">
                <NavLink to='/' className="brand-logo left">Curd UI Demo</NavLink>
                {user ? 
                    <ul className="right">
                        <li><NavLink to='/createpod'>New Pod</NavLink></li>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li className="btn-floating btn-large tooltipped" data-position='bottom' data-tooltip={user.name}>
                            <img src={user.imageUrl} alt={user.name}/>
                        </li>
                    </ul>
                : 
                    <ul className="right">
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/login'>Sign In</NavLink></li>
                    </ul>
                }
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    console.log('state in navbar', state);
    return {
        user: state.login
    };    
}

export default connect(mapStateToProps)(Navbar);

