/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Button, Alert } from 'reactstrap';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { getConfig } from '../config';
import Loading from './Loading';
import { fetchAuth } from '../utils/api';

export const ExternalApiComponent = () => {
  const { audience } = getConfig();

  const [state, setState] = useState({
    showResult: false,
    apiMessage: '',
    error: null,
  });

  const {
    getAccessTokenSilently,
    loginWithPopup,
    getAccessTokenWithPopup,
  } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const responseData = await fetchAuth(token);

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  return (
    <>
      <div className="mb-5">
        {state.error === 'consent_required' && (
          <Alert color="warning">
            You need to
            {' '}
            <a
              href="#/"
              className="alert-link"
              onClick={(e) => handle(e, handleConsent)}
            >
              consent to get access to users api
            </a>
          </Alert>
        )}

        {state.error === 'login_required' && (
          <Alert color="warning">
            You need to
            <a
              href="#/"
              className="alert-link"
              onClick={(e) => handle(e, handleLoginAgain)}
            >
              log in again
            </a>
          </Alert>
        )}

        <h1>External API</h1>
        <p className="lead">
          Ping an external API by clicking the button below.
        </p>

        <Button
          color="primary"
          className="mt-1"
          onClick={callApi}
          disabled={!audience}
        >
          Ping API
        </Button>
      </div>

      <div className="result-block-container">
        {state.showResult && (
          <div className="result-block">
            <h6 className="muted">Result</h6>
            <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default withAuthenticationRequired(ExternalApiComponent, {
  onRedirecting: () => <Loading />,
});
