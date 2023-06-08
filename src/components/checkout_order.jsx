import React, { useState } from 'react';
import './checkout.css';
import { db } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const GoTo = useNavigate();
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  let order = () => {
    if (!address || !phoneNumber) {
      alert("Please fill in the required fields.");
      return;
    }

    let user = JSON.parse(localStorage.getItem('user'));
    let all = JSON.parse(localStorage.getItem('cartItems'));
    localStorage.setItem('co', true);
    let order = [];
    let tot = 40;

    all.forEach((element, id) => {
      order.push({
        'name': element.title,
        'qty': element.qty,
      });
      tot += element.qty * element.price;
    });

    setDoc(doc(db, "Order", user.uid), {
      "name": user.displayName,
      "email": user.email,
      "order": order,
      'total': tot,
      'address': address,
      'phoneNumber': phoneNumber
    })
      .then(() => {
        alert("Your order has been placed successfully. We will now proceed to check your order and deliver it to you soon.");
        GoTo('/');
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("An error occurred while placing your order. Please try again later.");
      });
  };

  return (
    <div id='original'>
      <h1>Enter Your Details:</h1>
      <form id='co'>
        <div className="form-group">
          <table>
            <tbody>
              <tr>
                <td><b><label htmlFor="address">Address Line 1:</label></b></td>
                <td>
                  <input
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="1234 Main St"
                    type="text"
                    required
                    minLength="3"
                    maxLength="500"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="form-group">
          <table>
            <tbody>
              <tr>
                <td><b><label htmlFor="address1">Address Line 2:</label></b></td>
                <td>
                  <input
                    className="form-control"
                    id="address1"
                    name="address1"
                    placeholder="village, city"
                    type="text"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6 mb-0">
            <table>
              <tbody>
                <tr>
                  <td><b><label htmlFor="phone">Phone Number:</label></b></td>
                  <td>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="0761234568"
                      required
                      pattern="[0-9]{10}"
                      maxLength="10"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="form-group col-md-6 mb-0">
            <table>
              <tbody>
                <tr>
                  <td><b><label htmlFor="zipcode">Payment Method:</label></b></td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      id="zipcode"
                      name="zipcode"
                      value='Cash On Delivery'
                      maxLength="6"
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
      <center>
        <h3 onClick={() => order()}>Place Order</h3>
      </center>
    </div>
  );
}
