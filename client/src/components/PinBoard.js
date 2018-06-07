import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Moment from "react-moment";
import {getPosts} from "../store/actions/posts";

class PinBoard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getPosts();
    }

    render() {
        let posts = this.props.posts.map(post => {
            return <div className="pinHolder" key={post._id}>
                    <Link to={"/posts/"+post._id}>
                        <div className="pin">
                            <img src={post.image} />
                            <div className="pinLabel">
                                <h4>{post.title}</h4>
                                <Moment className="pinTime" fromNow>
                                    {post.createdAt}
                                </Moment>
                            </div>
                        </div>
                    </Link>
                </div>
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