import React from 'react';
import { GetStarted } from '@questlabs/react-sdk';
import { questConfig } from '../../config/questConfig';

const GetStartedComponent = () => {
  // Get user ID from localStorage or use default
  const userId = localStorage.getItem('userId') || questConfig.USER_ID;

  return (
    <div className="quest-getstarted-container">
      <GetStarted
        questId={questConfig.GET_STARTED_QUESTID}
        uniqueUserId={userId}
        autoHide={false}
      >
        <GetStarted.Header />
        <GetStarted.Progress />
        <GetStarted.Content />
        <GetStarted.Footer />
      </GetStarted>
    </div>
  );
};

export default GetStartedComponent;