import BeerForProductList from "./BeerForProductList";
import { useState } from "react";
import { Link } from "react-router-dom";
import PopUp from "./PopUp";
import BackButton from "./BackButton";

export default function ProductView({ addToBasket, beerTypes, taps }) {
  // popup variables + toggle open/close function
  const [popupInfo, setPopupInfo] = useState([{ label: "", content: "" }]);
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  function togglePopup(info) {
    setPopupIsOpen(!popupIsOpen);
    if (info !== undefined) {
      setPopupInfo([
        { label: "Name: ", content: info.name },
        { label: "Category: ", content: info.category },
        { label: "Alcohol: ", content: info.alc },
        { label: "Aroma: ", content: info.description.aroma },
        { label: "Appearance: ", content: info.description.appearance },
        { label: "Flavor: ", content: info.description.flavor },
        { label: "Mouthfeel: ", content: info.description.mouthfeel },
        {
          label: "Overall Impression: ",
          content: info.description.overallImpression,
        },
      ]);
    } else {
      setPopupInfo([{ label: "no", content: "no" }]);
    }
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "10px",
        maxWidth: "1000px",
      }}
    >
      <a href="https://skovgaart.dk/kea/foobar_final/index.html">
        <BackButton></BackButton>
      </a>
      {/* div that holds products displayed with grid */}
      <div
        style={{
          display: "grid",
          gridGap: "30px",
          width: "100%",
          margin: "auto",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {/* mapping through all the beers */}
        {beerTypes.map((product) => (
          <BeerForProductList
            info={product}
            key={product.name}
            addToBasket={addToBasket}
            taps={taps}
            togglePopup={togglePopup}
          ></BeerForProductList>
        ))}
        {/* popup section that is hidden at start */}
        {popupIsOpen ? (
          <PopUp togglePopup={togglePopup} popupInfo={popupInfo}></PopUp>
        ) : (
          ""
        )}
      </div>
      {/* Button to basket */}
      <div
        style={{
          display: "grid",
          width: "60%",
          margin: "10px auto",
          minWidth: "150px",
          maxWidth: "1000px",
        }}
      >
        <Link to="/basket">
          <button className="orangeButton">View Basket</button>
        </Link>
      </div>
    </div>
  );
}
