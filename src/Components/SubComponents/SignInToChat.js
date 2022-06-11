import PropTypes from 'prop-types'
import React, { Component } from 'react'
import '../../css/sitc.css'

class SITC extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <> 
                <div className='sitc'>
                    <button className='sitc-btn' id="gogls" onClick={this.props.signinwithgoogle}><img src="https://media4.giphy.com/media/2epS8zhisYtHDCKrWv/giphy.gif"/><p>SignIn With Google</p></button>
                    <br/>
                    <button className='sitc-btn' id="faces" onClick={this.props.withfacebook}><img src="https://media1.giphy.com/media/VhbnQX5NKhNFQUzOVp/giphy.gif?cid=6c09b952dqx8fkhw81kxr2djhy0veo518pqbn874ig9cayxq&rid=giphy.gif&ct=s"/><p>SignIn With Facebook</p></button>
                </div>
            </>
        );
    }
}

export default SITC;