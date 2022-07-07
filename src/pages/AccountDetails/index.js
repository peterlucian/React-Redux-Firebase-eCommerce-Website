import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from './../../components/forms/Button';
import Modal from './../../components/Modal';
import FormInput from './../..//components/forms/FormInput';
import { CountryDropdown } from 'react-country-region-selector';

import { updateAddressStart, fetchAddressStart } from './../../redux/User/user.actions';

import './styles.scss';

const initialAddressState = {
  recipientName: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
};

const mapState = ({ user }) => ({
  userAddress: user.addressData
});


function AccountDetails() {
  const dispatch = useDispatch();
  const { userAddress } = useSelector(mapState);

  const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState });

  const [hideModal, setHideModal] = useState(true);
  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  useEffect(() => {
    dispatch(fetchAddressStart());
  }, [])

  const handleShipping = evt => {
    const { name, value } = evt.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (
      !shippingAddress.line1 || !shippingAddress.city ||
      !shippingAddress.state || !shippingAddress.postal_code ||
      !shippingAddress.country || !shippingAddress.recipientName
    ) {
      return;
    }

    dispatch(
      updateAddressStart(shippingAddress)
    );

    toggleModal();

  };


  return (
    <div className="admin">
      <h1>
        Account Details
      </h1>

      <div >
        <table>
          <tbody>
            {userAddress && Object.keys(userAddress).map((KeyName, index) => {
              return (
                <tr key={index}>
                  <td>{userAddress[KeyName]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="callToActions">
        <ul>
          <li>
            {userAddress && Object.keys(userAddress).length === 0
              ? <Button onClick={() => toggleModal()}> Add your address </Button>
              : <Button onClick={() => toggleModal()}> Update your address </Button>
            }
          </li>
        </ul>
      </div>
      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>
              Add your address
            </h2>

            <div className="group">
              <FormInput
                required
                placeholder="Recipient Name"
                name="recipientName"
                handleChange={evt => handleShipping(evt)}
                value={shippingAddress.recipientName}
                type="text"
              />

              <FormInput
                required
                placeholder="Line 1"
                name="line1"
                handleChange={evt => handleShipping(evt)}
                value={shippingAddress.line1}
                type="text"
              />

              <FormInput
                placeholder="Line 2"
                name="line2"
                handleChange={evt => handleShipping(evt)}
                value={shippingAddress.line2}
                type="text"
              />

              <FormInput
                required
                placeholder="City"
                name="city"
                handleChange={evt => handleShipping(evt)}
                value={shippingAddress.city}
                type="text"
              />

              <FormInput
                required
                placeholder="State"
                name="state"
                handleChange={evt => handleShipping(evt)}
                value={shippingAddress.state}
                type="text"
              />

              <FormInput
                required
                placeholder="Postal Code"
                name="postal_code"
                handleChange={evt => handleShipping(evt)}
                value={shippingAddress.postal_code}
                type="text"
              />

              <div className="formRow checkoutInput">
                <CountryDropdown
                  required
                  onChange={val => handleShipping({
                    target: {
                      name: 'country',
                      value: val
                    }
                  })}
                  value={shippingAddress.country}
                  valueType="short"
                />
              </div>
            </div>


            <Button type="submit">
              Add address
            </Button>

          </form>
        </div>
      </Modal>



    </div>
  );
};



export default AccountDetails
