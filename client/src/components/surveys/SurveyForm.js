// SurveyForm.js - shows a form for user to add input

import _ from 'lodash';
import React, { Component } from "react";
import { Link } from 'react-router-dom';

// Allows components to communicate with the redux store
import { reduxForm, Field } from 'redux-form';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    { label: 'Survey Title', name: 'title'},
    { label: 'Subject Line', name: 'subject'},
    { label: 'Email body', name: 'body'},
    { label: 'Recipient List', name: 'emails'}
];

class SurveyForm extends Component{
    renderField(){
        return _.map(FIELDS, ({ label, name }) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
        });
    }

    render() {
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderField()}
                    <Link to="/surveys" className="grey btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">navigate_next</i>
                    </button>
                </form>
            </div>
        );
    }
}

// Validate values contained in the fields
function validate(values){
    const errors = {};
    errors.emails = validateEmails(values.emails || '');

    _.each(FIELDS, ({ name }) => {
        if (!values[name]){
            errors[name] = '*No value provided*';
        }
    });
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);