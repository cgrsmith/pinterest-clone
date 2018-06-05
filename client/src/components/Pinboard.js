import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Moment from "react-moment";
import {getPosts} from "../store/actions/posts";

import testPic from "../images/testPic.jpg";

class PinBoard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getPosts();
    }

    render() {
        let posts = this.props.posts.map(post => {
            return <Link to={"/posts/"+post._id} key={post._id}>
                    <div className="pin">
                        <img src={testPic} />
                        <div className="pinLabel">
                            <h4>{post.title}</h4>
                            <Moment className="pinTime" fromNow>
                                <span>{post.createdAt}</span>
                            </Moment>
                        </div>
                    </div>
                </Link>
        });
        return (
            <div className="pinBoard">
                {posts}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        posts : state.posts.posts
    }
}

export default connect(mapStateToProps, {getPosts})(PinBoard);