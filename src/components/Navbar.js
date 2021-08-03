import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import M from 'materialize-css'
import { config } from '../config';
import { PublicClientApplication } from '@azure/msal-browser';
import { loggedIn } from '../podAction';

export class Navbar extends Component {

    state = {
        login: null,
        error: null
    };

    componentDidUpdate() {
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems, {});
    };

    publicClientApplication = new PublicClientApplication({
        auth: {
            clientId: config.appid,
            redirectUri: config.redirectUri,
            authority: config.authority,
            knownAuthorities: [config.authority],
        }, 
        cache: {
            cacheLocation: 'sessionStorage',
            storeAuthStateInCookie: true
        }
    })

    loginAd = () => {
        console.log('login ad');

        this.publicClientApplication.loginPopup({
                scopes: config.scopes,
                propmpt: 'select-account'})
            .then((res) => {
                console.log('login ad1');
                console.log('res', res);
                console.log(res.account.idTokenClaims.given_name);

                this.setState({
                    login: {
                        accessToken: res.accessToken,
                        name: res.account.idTokenClaims.given_name,
                        imageUrl: 'https://storage.live.com/Users/2707918578380561957/MyProfile/ExpressionProfile/ProfilePhoto:Win8Static,UserTileMedium,UserTileStatic'
                    }
                });
                this.props.loggedIn(this.state.login);                    
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    login: null,
                    error: err
                });
            })
        }

    logoffAd = () => {
        this.publicClientApplication.logout();
    }

    render() {
        const {login} = this.state;

        return (
            <nav className="nav-wrapper grey darken-3" style = {{paddingTop:'5px'}}>
                <div className="container">
                    <NavLink to='/' className="brand-logo left">Crud UI Demo</NavLink>
                    {login ? 
                        <ul className="right">
                            <li><NavLink to='/createpod'>New Pod</NavLink></li>
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li className="btn-floating btn-large tooltipped" data-position='bottom' data-tooltip={login.name}>
                                <img src={login.imageUrl} alt={login.name} style = {{width:'60px', height:'60px'}}/>
                            </li>
                        </ul>
                    : 
                        <ul className="right">
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><button className = 'btn' onClick = {this.loginAd}>Sign In</button></li>
                        </ul>
                    }
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    };    
}

const mapDispatchToProps = (dispatch) => {
    return {
        loggedIn: (login) => dispatch(loggedIn(login))
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

