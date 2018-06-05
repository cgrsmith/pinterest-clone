import React, {Component} from "react";

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            username : "",
            profileImage : "",
            profileText : "",
            password : "",
            confirmPassword : ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.signup) {
            this.props.authUser("signup", this.state)
                .then(() => {
                    this.props.history.push("/");
                })
                .catch(err => {
                    return err;
                });
        } else {
            this.props.authUser("signin", this.state)
                .then(() => {
                    this.props.history.push("/");
                })
                .catch(err => {
                    return err;
                });
        }
    }
    render() {

        return (
            <div className="form">
                {this.props.signup ?
                    <form onSubmit={this.handleSubmit}>
                        <h2>signup</h2> 
                        <div className="formSegment">
                            <label>Email Address: </label>
                            <input type="text" placeholder="" name="email" value={this.state["email"]}
                                onChange={this.handleChange} required  className="input inputSmall"/>
                        </div>
                        <div className="formSegment">
                            <label>Username: </label>
                            <input type="text" placeholder="" name="username" value={this.state["username"]}
                                onChange={this.handleChange} required className="input inputSmall"/>
                        </div>
                        <div className="formSegment">
                            <label>Profile Image: </label>
                            <input type="text" placeholder="" name="profileImage" value={this.state["profileImage"]}
                                onChange={this.handleChange} className="input inputSmall"/>
                        </div>
                        <div className="formSegment">
                            <label>Profile Text: </label>
                            <textarea name="profileText" value={this.state["profileText"]} 
                                onChange={this.handleChange} className="input inputTextarea"/>
                        </div>
                        <div className="formSegment">
                            <label>Password: </label>
                            <input type="text" placeholder="" name="password" value={this.state["password"]}
                                onChange={this.handleChange} required className="input inputSmall"/>
                        </div>
                        <div className="formSegment">
                            <label>Confirm Password: </label>
                            <input type="text" placeholder="" name="confirmPassword" value={this.state["confirmPassword"]}
                                onChange={this.handleChange} required className="input inputSmall"/>
                        </div>
                        <button type="submit">
                            Sign Up
                        </button>
                    </form> 
                :
                    <form onSubmit={this.handleSubmit}>
                        <h2>signin</h2> 
                        <div className="formSegment">
                            <label>Email Address: </label>
                            <input type="text" placeholder="" name="email" value={this.state["email"]}
                                onChange={this.handleChange} required className="input inputSmall"/>
                        </div>
                        <div className="formSegment">
                            <label>Password: </label>
                            <input type="text" placeholder="" name="password" value={this.state["password"]}
                                onChange={this.handleChange} required className="input inputSmall"/>
                        </div>

                        <button type="submit">
                            Sign In
                        </button>
                    </form>
                }
            </div>
        )
    }
}

export default AuthForm;