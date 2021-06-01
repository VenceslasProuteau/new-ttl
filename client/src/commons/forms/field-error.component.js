import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSpy } from 'react-final-form';
import './field-error.scss';

export const FieldErrorMessage = ({ name = [], when = [], message = '' }) => (
  <Field
    name={name}
    subscription={{ submitFailed: true, error: true, active: true }}
    render={({ meta: { submitFailed, error, active } }) => (
      !active && submitFailed && error && (when ? when.indexOf(error) >= 0 : true)
        ? <span className="form-error-message">{message || error}</span> : null
    )}
  />
);
