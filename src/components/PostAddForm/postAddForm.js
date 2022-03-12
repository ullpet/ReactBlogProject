import React, { Component } from "react";
import "./postaddform.css";

export default class PostAddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    onValueChange(e){
        this.setState({
            text: e.target.value
        });
    };

    onSubmit(e) {
        this.props.onAdd(this.state.text);
        e.preventDefault();
        this.setState({
            text: ''
        });
    };

    render() {
        return (
            <form
                className="bottom-panel d-flex"
                onSubmit={this.onSubmit}
                >
                <input
                type="text"
                placeholder="О чем вы думаете сейчас?"
                className="form-control new-post-labe;"
                onChange={this.onValueChange}
                value={this.state.text}
                ></input> 
                <button 
                    type="submit" 
                    className="btn btn-outline-secondary"
                    >Добавить</button>   
            </form>
            )
        }
    }