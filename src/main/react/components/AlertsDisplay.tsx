import { AlertType } from '../models/weather/Alert';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { getTimeString } from './utils';

interface AlertsProps {
  alerts: Array<AlertType>;
}

interface AlertProps {
  alert: AlertType;
}

const AlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  padding: 5px;
  border: 1px solid grey;

  .time {
    font-size: 10px;
  }

  .event {
    font-weight: bold;
    font-size: 12px;
    margin-bottom: 5px;
  }

  .description {
    font-size: 12px;
  }

  .sender {
    font-size: 10px;
    font-style: italic;
    margin-top: 5px;
  }
`;

const AlertsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const AlertDisplay: React.FunctionComponent<AlertProps> = ({ alert }) => {
  return (
    <AlertWrapper>
      <div className={'time'}>
        {getTimeString(alert.start)} - {getTimeString(alert.end)}
      </div>
      <div className={'event'}>{alert.event}</div>
      <div className={'description'}>{alert.description}</div>
      <div className={'sender'}>{alert.sender}</div>
    </AlertWrapper>
  );
};

const AlertsDisplay: React.FunctionComponent<AlertsProps> = ({ alerts }) => {
  return (
    <AlertsWrapper>
      {alerts.map((alert, index) => (
        <AlertDisplay key={index} alert={alert} />
      ))}
    </AlertsWrapper>
  );
};

export default AlertsDisplay;
