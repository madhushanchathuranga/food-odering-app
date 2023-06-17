import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import CartContainer from "./CartContainer";
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from "../firebase.config";
import './own.css'

const Orders = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  let order_ids = []

  useEffect(() => { }, [scrollValue, cartShow]);

  let head = <h1 id="mh">All Order Details</h1>

  let Cool = async () => {
    const orders = await getDocs(collection(db, "Order"));
    order_ids = []

    orders.forEach(element => {
      order_ids.push(element.id);
    })
    let code = document.querySelector('#code')
    code.innerHTML = ''
    order_ids.forEach(element => {
      onSnapshot(doc(db, "Order", element), (doc) => {
        let all = doc.data()
        let row = ``

        all.order.forEach(element => {
          row += `<tr> <td>${element.name} </td> <td>${element.qty}</td> </tr> `
        });

        document.querySelector('.lloader')

        code.innerHTML = code.innerHTML + `
        <div id="order">
            <h3> >>> Name : ${all.name} <<< </h3>
            <h3> >>> Email : ${all.email} <<< </h3>
            <h3> >>> Number : ${all.phoneNumber} <<< </h3>
            <h3> >>> Address : ${all.address} <<< </h3>

            <center><table>
              <caption>Order Details</caption>
              <tr>
                <th>Food item</th> <th>Quantity</th> 
              </tr>
                ${row}
            </table></center>
            <h3> >>> Totel : ${all.total} rupees <<< </h3>
        </div>
        `
      })
    });
  }

  Cool()

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center ">
      {cartShow && <CartContainer />}
      {head}
      <center><div id="code">
        <div class="loader">
          <div class="loader-inner"></div>
        </div>
      </div></center>

    </div>
  );
};

export default Orders;
