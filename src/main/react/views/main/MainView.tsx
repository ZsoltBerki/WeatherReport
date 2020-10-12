import React from 'react';

interface MainViewProps {
  className?: string;
}

const MainView: React.FunctionComponent<MainViewProps> = ({ className }) => {
  return (
    <div className={className}>
      <h1>This is a React View with Typescript</h1>
    </div>
  );
};

export default MainView;
