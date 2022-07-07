import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Dashboard = props => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  useEffect(() => {


  }, []);

  return (
    <div>
      <h1>
        Welcome 
      </h1>

  
    </div>
  );
};

export default Dashboard;
