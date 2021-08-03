// this component is no longer used. it was used to demonstrate google login function with 'react-google-login' module.
// google login was federated into AZure B2C implemented in Navbar.

import {GoogleLogin} from 'react-google-login'
import {refreshTokenSetup } from './refreshToken'
import {config} from '../config'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loggedIn } from '../podAction'

export class LogIn extends Component {

    state = {
        email: '',
        loginState: false
    };

    onFailure= (res) => {
        console.log('[Google Login Failure] res:', res);
    }

    onSuccess = (res) => {
        this.props.loggedIn(res);        

        refreshTokenSetup(res);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <GoogleLogin 
                    clientId={config.google_client_id}
                    buttonText = "Login"
                    onSuccess = {this.onSuccess}
                    onFailure = {this.onFailure}
                    cookliePolicy = {'sing_host_origin'}
                    style = {{marginTop: '100px'}}
                    isSignedIn={true}
                />       
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loggedIn: (res)=>dispatch(loggedIn(res))
    }
}

export default connect(null, mapDispatchToProps)(LogIn)
