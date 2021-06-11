import { useState } from "react";

export default function BeerForProductList({
  info,
  addToBasket,
  taps,
  togglePopup,
}) {
  const [amount, setAmount] = useState(1);

  const beersOnTap = taps.map((tap) => tap.beer);
  const soldOut = beersOnTap.indexOf(info.name) === -1 ? true : false;

  // Addbutton animation when added
  function moveAnime(e) {
    e.style.backgroundColor = "black";
    e.style.color = "white";
    e.style.fontWeight = "bold";
    e.innerHTML = "Added";

    setTimeout(() => {
      e.style.backgroundColor = "white";
      e.style.color = "black";
      e.style.fontWeight = "normal";
      e.innerHTML = "Add To Basket";
    }, 1000);
  }

  return (
    <article
      style={{
        padding: "15px",
        background: "#0D0601",
        border: "1px solid #FFFFFF",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "10px",
          height: "100%",
        }}
      >
        {/* image */}
        <div
          style={{
            flexBasis: "130px",
            flexGrow: "2",
            color: "white",
            width: "100px",
            backgroundImage: "url('./images/" + info.label + "')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            marginRight: "10px",
            minHeight: "100px",
            height: "100%",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "200px",
            flexGrow: "2",
            width: "100%",
            color: "white",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/* name */}
            <h2
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                letterSpacing: "0.1em",
              }}
            >
              {info.name}
            </h2>
            {/* info */}
            <div
              className="infoButton"
              style={{
                textAlign: "center",
                borderRadius: "50%",
                background: "#FAEBDE",
                fontWeight: "500",
                color: "#0D0601",
                width: "25px",
                height: "25px",
                margin: "-3px 0 0 5px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                padding: "10px",
              }}
              onClick={() => togglePopup(info)}
            >
              i
            </div>
          </div>
          {/* price */}
          <div>
            <p
              style={{
                fontWeight: "300",
                fontSize: "18px",
              }}
            >
              25 kr/stk
            </p>
          </div>
          {/* if sold out buttons will be disabled */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className={soldOut ? "soldout" : ""}
          >
            <button
              className="amountButton"
              onClick={() => {
                setAmount((prevState) => (prevState -= 1));
              }}
              disabled={amount === 1 || soldOut}
            >
              -
            </button>
            <p
              style={{
                fontWeight: "300",
                fontSize: "20px",
                lineHeight: "23px",
              }}
            >
              {amount}
            </p>
            <button
              className="amountButton"
              onClick={() => {
                setAmount((prevState) => (prevState += 1));
              }}
              disabled={soldOut}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button
        style={{
          fontSize: "15px",
          textAlign: "center",
          padding: "15px",
          background: "white",
          border: "3px solid #C9802F",
          boxSizing: "border-box",
          boxShadow: "0px 4px 11px rgba(0, 0, 0, 0.51)",
          width: "100%",
        }}
        onClick={(e) => {
          info.amount = amount;
          addToBasket(info);
          moveAnime(e.target);
        }}
        disabled={soldOut}
      >
        {soldOut ? "Not On Tap" : "Add To Basket"}
      </button>
    </article>
  );
}
