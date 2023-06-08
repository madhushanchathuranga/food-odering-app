import React, { useEffect, useState } from "react";
import './checkout.css'
import CartContainer from "./CartContainer";
import { useStateValue } from "../context/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBicycle, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const BikeDelivery = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  const checkout = localStorage.getItem("co");
  const [mapContent, setMapContent] = useState(null);

  useEffect(() => {
    if (checkout) {
      setMapContent(
        <div>

          <div class="loader-overlay">
            <div class="loader-container">
              <div class="loader1"></div>
              <p class="loader-text">Please wait...</p>
            </div>
          </div>


          <h1 className="text-xl font-bold mb-2">
            We are searching for bike riders to pick up your order...
          </h1>
          <div id="mp">
            <iframe
              src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=A2,%20Matara+(Food%20Delivery)&amp;t=k&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              title="Delivery Map"
            >
              <a href="https://www.maps.ie/distance-area-calculator.html">
                distance maps
              </a>
            </iframe>
          </div>
        </div>
      );
    } else {
      setMapContent(<h1 className="text-xl font-bold">No Order Found</h1>);
    }
  }, [checkout]);

  return (
    <div id="map">
      {cartShow && <CartContainer />}
      <div className="flex items-center justify-center">
        <div id="bikeic" className="bg-primary rounded-full p-3 shadow-lg">
          <FontAwesomeIcon
            icon={faBicycle}
            size="3x"
            className="text-white"
          />
        </div>
        <h2 className="text-2xl font-bold ml-4">Bike Delivery</h2>
      </div>
      <div className="flex items-center justify-center mt-4">
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          size="2x"
          className="text-primary mr-2"
        />
        {/* <h3 className="text-xl font-semibold">Delivery Location</h3> */}
      </div>
      <div className="mt-2">{mapContent}</div>
    </div>
  );
};

export default BikeDelivery;
