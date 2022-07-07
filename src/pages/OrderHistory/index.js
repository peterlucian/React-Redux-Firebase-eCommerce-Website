import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderHistory } from '../../redux/Orders/orders.actions';
import Orders from '../../components/Orders';
import './styles.scss';

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data
});

const OrderHistory = props => {
  const dispatch = useDispatch();
  const { currentUser, orderHistory } = useSelector(mapState);

  useEffect(() => {
    dispatch(
      getUserOrderHistory(currentUser.id)
    );

  }, []);

  return (

    <div>
      <h1>
        Order History
      </h1>

      <Orders orders={orderHistory} />
    </div>
  );
};

export default OrderHistory;