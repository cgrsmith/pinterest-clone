import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
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
            return <Link to={"/posts/"+post._id} key={post._id}>
                    <div>
                        <img src="" />
                        <h4>{post.title}</h4>
                        <p>{post.createdAt}</p>
                    </div>
                </Link>
        });
        return (
            <div>
                Pinboard
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