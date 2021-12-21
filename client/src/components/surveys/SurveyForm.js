// SurveyForm.js - shows a form for user to add input

import React, { Component } from "react";

// Allows components to communicate with the redux store
import { reduxForm } from 'redux-form';

class SurveyForm extends Component{
    render() {
        return(
            <div>
                SurveyForm
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);