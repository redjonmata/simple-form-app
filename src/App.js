import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import CreatableSelect from 'react-select/creatable';
/* eslint-disable */

class App extends Component {
    render() {
        return (
            <SimpleForm/>
        );
    }
}

const validEmailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const validFirstAndLastNameRegex = RegExp(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

const countErrors = (errors) => {
    let count = 0;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (count = count + 1)
    );
    return count;
}

class SimpleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            hobbies: [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
                { value: 'banana', label: 'Banana' },
                { value: 'cookie', label: 'Cookie' },
            ],
            formValid: false,
            errorCount: null,
            errors: {
                firstName: '',
                lastName: '',
                email: '',
            },
            selectedHobbies: [],
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'firstName':
                errors.firstName =
                    validFirstAndLastNameRegex.test(value)
                        ? ''
                        : 'First Name must only contain letters and spaces!';
                break;
            case 'lastName':
                errors.lastName =
                    validFirstAndLastNameRegex.test(value)
                        ? ''
                        : 'Last Name must only contain letters and spaces!';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            default:
                break;
        }

        this.setState({
            errors, [name]: value,
        });
    }

    handleHobbiesChange = (newValue) => {
        this.setState({selectedHobbies: newValue})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({formValid: validateForm(this.state.errors)});
        this.setState({errorCount: countErrors(this.state.errors)});
    }

    render() {
        const {firstName, lastName, email, errors, selectedHobbies, formValid} = this.state;
        return (
            <div className={`row`}>
                <div className={`col-md-3 wrapper-right`}>
                    <form onSubmit={this.handleSubmit}>
                        <div className='firstName'>
                            <label htmlFor="firstName">First Name</label>
                            <input className={`form-control `} type='text' name='firstName' defaultValue={this.state.firstName} onChange={this.handleChange}/>
                            {errors.firstName.length > 0 &&
                            <span className={`alert-danger`}>{errors.firstName}</span>}
                        </div>
                        <div className='lastName'>
                            <label htmlFor="lastName">Last Name</label>
                            <input className={`form-control `} type='text' name='lastName' defaultValue={this.state.lastName} onChange={this.handleChange}/>
                            {errors.lastName.length > 0 &&
                            <span className={`alert-danger`}>{errors.lastName}</span>}
                        </div>
                        <div className='email'>
                            <label htmlFor="email">Email</label>
                            <input className={`form-control `} type='email' name='email' defaultValue={this.state.email} onChange={this.handleChange}/>
                            {errors.email.length > 0 &&
                            <span className={`alert-danger`}>{errors.email}</span>}
                        </div>
                        <div className={`hobbies`}>
                            <label htmlFor="hobbies">Hobbies</label>
                            <CreatableSelect
                                isMulti
                                options={this.state.hobbies}
                                onChange={this.handleHobbiesChange}
                            />
                            <span className={`alert-danger`}>{errors.password}</span>
                        </div>
                        <button className={`btn btn-primary`}>Create</button>
                    </form>
                </div>
                <div className={`col-md-3 wrapper-left`}>
                    <div className={`vl`}>
                        <div className={`results`}>
                            {
                                this.state.errorCount !== null
                                    ?
                                    <p>
                                        {
                                            formValid
                                            ?
                                                firstName.length > 0 && lastName.length > 0 && email.length > 0 && this.state.selectedHobbies.length > 0
                                                ?
                                                    <div>
                                                        <p>First Name: {firstName}</p>
                                                        <p>Last Name: {lastName}</p>
                                                        <p>Email: {email}</p>
                                                        <p>Selected hobbies:</p>
                                                        <SelectedHobbies hobbies={selectedHobbies} />
                                                    </div>
                                                : 'One or more fields are empty.'

                                            : 'Submit is invalid. Check your errors.'
                                        }
                                    </p>
                                : 'Form not submitted.'
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class SelectedHobbies extends React.Component {
    render() {
        return (
            <ul>
                {this.props.hobbies.map(item => (
                    <li>{item.label}</li>
                ))}
            </ul>
        );
    }
}

export default App;
