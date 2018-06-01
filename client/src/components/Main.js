import React, {Component} from "react";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {authUser} from "../store/actions/auth";

import "../style.css";
import AuthForm from "./AuthForm";
import PinBoard from "./PinBoard";
import PinEdit from "./PinEdit";
import PinForm from "./PinForm";
import PinEnlarged from "./PinEnlarged";
import UserProfile from "./UserProfile";
import UserProfileEdit from "./UserProfileEdit";

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
                    <Route exact path="/posts/new" render={props => 
                        <PinForm  postId={props.match.params.id} {...props}/>} 
                    />
                    <Route exact path="/posts/:id" render={props => 
                        <PinEnlarged  postId={props.match.params.id} />} 
                    />
                    <Route exact path="/posts/:id/edit" render={props => 
                        <PinEdit  postId={props.match.params.id} {...props}/>} 
                    />
                    <Route exact path="/user/:id" render={props => 
                        <UserProfile userId={props.match.params.id}/>} 
                    />
                    <Route exact path="/user/:id/edit" render={props => 
                        <UserProfileEdit userId={props.match.params.id} {...props}/>} 
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