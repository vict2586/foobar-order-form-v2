export default function BeerForBasketView({
  info,
  removeFromBasket,
  updateAmountInBasket,
}) {
  return (
    <article
      style={{
        padding: "10px",
        background: "#0D0601",
        border: "1px solid #FFFFFF",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        {/* image */}
        <div
          style={{
            flexBasis: "100px",
            color: "white",
            backgroundImage: "url('./images/" + info.label + "')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            marginRight: "10px",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "200px",
            flexGrow: "4",
            width: "100%",
            color: "white",
            gap: "10px",
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
            {/* delete button */}
            <button
              style={{
                textAlign: "center",
                borderRadius: "50%",
                background: "#FAEBDE",
                fontWeight: "600",
                color: "#0D0601",
                width: "25px",
                height: "25px",
                margin: "-3px 0 0 5px",
                border: "none",
              }}
              text="x"
              onClick={() => removeFromBasket(info)}
            >
              x
            </button>
          </div>
          <div>
            {/* subtotal price */}
            <p
              style={{
                fontWeight: "300",
                fontSize: "18px",
              }}
            >
              {"Subtotal: " + info.amount * 25 + " kr."}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/* less button */}
            <button
              className="amountButton"
              onClick={() => updateAmountInBasket(info, "-")}
              disabled={info.amount === 1}
            >
              -
            </button>
            <p
              style={{
                fontWeight: "300",
                fontSize: "20px",
                lineHeight: "23px",
                padding: "0 20px",
              }}
            >
              {info.amount}
            </p>
            {/* more button */}
            <button
              className="amountButton"
              onClick={() => updateAmountInBasket(info, "+")}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
