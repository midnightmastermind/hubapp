import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/hub");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/hub"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData)
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="auth-container">
                <div className="auth-form">
                    <Link to="/" className="white-text btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to
                        home
                    </Link>
                    <div className="white-text" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>Login</b> below
                        </h4>
                        <p className="text-darken-1">
                            Don't have an account? <Link style={{ fontWeight: "600" }} to="/register">Register</Link>
                        </p>
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="input-field col s12" style={{ paddingBottom: "2px" }}>
                            <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                style={{ paddingLeft: "10px" }}
                                className={classnames("", {
                                    invalid: errors.email || errors.emailnotfound
                                  })}
                            />
                            <label htmlFor="email">Email</label>
                             <span className="red-text">
                                  {errors.email}
                                  {errors.emailnotfound}
                              </span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                style={{ paddingLeft: "10px" }}
                                className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}
                            />
                            <label htmlFor="password">Password</label>
                            <span className="red-text">
                                {errors.password}
                                {errors.passwordincorrect}
                            </span>
                        </div>
                        <div style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable accent-3 black-text"
                                >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
