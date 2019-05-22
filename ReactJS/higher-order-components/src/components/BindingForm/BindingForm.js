import React, { Component } from 'react';

class BindingForm extends Component {

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div>
                <header><span className="title">Binding Form</span></header>
                <form onSubmit={(e) => this.props.onSubmit(e,this.state)}>
                    {React.Children.map(this.props.children, child => {
                        if (child.type === 'input') {
                            return React.cloneElement(child, { onChange: this.handleChange.bind(this), ...child.props })
                        }
                        return child
                    })}
                    <input type="submit" value="Register" />
                </form>
            </div>
        );
    }
}

export default BindingForm;
