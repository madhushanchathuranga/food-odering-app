import React, { useState } from 'react'
import './checkout.css'
import { db } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const GoTo = useNavigate()

    let order = () => {

        let user = JSON.parse(localStorage.getItem('user'))
        let all = JSON.parse(localStorage.getItem('cartItems'))
        localStorage.setItem('co', true);
        let order = []
        let tot = 40

        all.forEach((element, id) => {
            order.push({
                'name': element.title,
                'qty': element.qty,
            });
            tot += element.qty * element.price
        });


        let address1 = document.querySelector('#address').value
        let address2 = document.querySelector('#address1').value
        let phone = document.querySelector('#phone').value
        setDoc(doc(db, "Order", user.uid), {
            "name": user.displayName,
            "email": user.email,
            "order": order,
            'totel': tot,
            'address': `${address1}, ${address2}`,
            'num': phone
        })
        alert("Your order has been placed successfully. We will now proceed to check your order and deliver it to you soon.")
        GoTo('/')
    }

    return (
        <div id='original'>
            <h1>Enter Your Details:</h1>
            <form id='co'>
                <div class="form-group">
                    <tr>
                        <td><b><label for="address">Address Line 1:</label></b></td>
                        <td><input class="form-control" id="address" name="address" placeholder="1234 Main St" type="text" required minlength="3" maxlength="500" /></td>
                    </tr>
                </div>
                <div class="form-group">
                    <tr>
                        <td><b><label for="address1">Address Line 2:</label></b></td>
                        <td><input class="form-control" id="address1" name="address1" placeholder="village, city" type="text" /></td>
                    </tr>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6 mb-0">
                        <tr>
                            <td><b><label for="phone">Phone Number:</label></b></td>
                            <td><input type="tel" class="form-control" id="phone" name="phone" placeholder="0761234568" required pattern="[0-9]{10}" maxlength="10" /></td>
                        </tr>
                    </div>
                    <div class="form-group col-md-6 mb-0">
                        <tr>
                            <td><b><label for="zipcode">Payment Method:</label></b></td>
                            <td><input type="text" class="form-control" id="zipcode" name="zipcode" value='Cash On Delivery' maxlength="6" /></td>
                        </tr>
                    </div>
                </div>
            </form>
            <center> <h3 onClick={() => order()}>Place Order</h3> </center>
        </div>
    )
}
