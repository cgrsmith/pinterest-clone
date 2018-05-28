import React, {Component} from "react";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {authUser} from "../store/actions/auth";

import "../style.css";
import AuthForm from "./AuthForm";
import PinBoard from "./PinBoard";
import PinForm from "./PinForm";
import PinEnlarged from "./PinEnlarged";

class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/posts" />} />
                    <Route exact path="/posts" render={props => 
                        <PinBoard />} 
                    />
                    <Route exact path="/posts/:id" render={props => 
                        <PinEnlarged {...props} />} 
                    />
                    <Route exact path="/signin" render={props => 
                        <AuthForm signup={false} authUser={this.props.authUser} {...props}/>} 
                    />
                    <Route exact path="/signup" render={props => 
                        <AuthForm signup={true} authUser={this.props.authUser} {...props}/>} 
                    />
                    
                    
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user : state.user,
        error : state.errorMessage
    }
}

export default withRouter(connect(mapStateToProps, {authUser})(Main));