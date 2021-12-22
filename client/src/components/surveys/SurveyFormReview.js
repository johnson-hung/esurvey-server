// SurveyFormReview.js - shows users their form inputs for review

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries:</h5>
            {reviewFields}
            <button className="grey btn-flat white-text" onClick={onCancel}>
                Back
                <i className="material-icons left">navigate_before</i>
            </button>
            <button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues)}>
                Send Survey
                <i className="material-icons left">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state){
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);