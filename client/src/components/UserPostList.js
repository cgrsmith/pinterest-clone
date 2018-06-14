import React, {Component} from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";

class UserPostList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cloudinaryApiEndpoint = "https://res.cloudinary.com/cgrsmith/image/upload/";
        const cropping = "c_crop,h_100,w_80/"
        return (
            <ul className="listStyle horizontalDivide">
                {this.props.posts.map((post, index) => {
                    const thumbnailLink = String(post.image).substr(cloudinaryApiEndpoint.length); 
                    return <Link to={"/posts/" + post._id} key={index} className="listLink">
                        <li>
                            <div className="postThumbnail">
                                <img src={cloudinaryApiEndpoint + cropping + thumbnailLink} alt="Post thumbnail"/>
                            </div>
                            <div className="postSnippet">
                                <span>{post.title}</span>
                                <span>
                                    <em><Moment className="commentTime" fromNow>{post.createdAt}</Moment></em>
                                </span>
                            </div>
                        </li>
                    </Link>
                })}
            </ul>
        )
    }
}

export default UserPostList;
