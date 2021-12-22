// SurveyForm.js - shows a form for user to add input

import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Allows components to communicate with the redux store
import { reduxForm, Field } from 'redux-form';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component{
    renderField(){
        return _.map(formFields, ({ label, name }) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
        });
    }

    render() {
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
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
    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if (!values[name]){
            errors[name] = '*No value provided*';
        }
    });
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);