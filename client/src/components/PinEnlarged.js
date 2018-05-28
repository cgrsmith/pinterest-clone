import React, {Component} from "react";

class PinEnlarged extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                Pin {this.props.params.id}
            </div>
        )
    }
}

export default PinEnlarged;