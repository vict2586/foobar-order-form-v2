import BeerForBasketView from "./BeerForBasketView";
import { Link } from "react-router-dom";
import RadioButton from "./RadioButton";
import BackButton from "./BackButton";

export default function BasketView({
  basket,
  removeFromBasket,
  updateAmountInBasket,
  updateOrderData,
  setTableNumber,
  setPaymentMethod,
  paymentMethod,
}) {
  // Calculate total price of order
  let totalPrice = 0;
  basket.map((product) => (totalPrice += product.amount * 25));
  // array of possible payment mothods
  let paymentMethods = ["Credit Card", "MobilePay", "ApplePay", "Cash"];

  return (
    <div
      style={{
        display: "grid",
        gridGap: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "10px",
      }}
    >
      <Link to="/">
        <BackButton></BackButton>
      </Link>
      <h2>Your Basket</h2>
      <div
        style={{
          display: "grid",
          gridGap: "10px",
          gridTemplateColumns: "repeat(auto-fill, minmax(100%, 1fr))",
        }}
      >
        {/* If nothing in basket show text else show basket items by mapping over basket */}
        {basket.length !== 0 ? (
          basket.map((product) => (
            <BeerForBasketView
              info={product}
              key={product.name}
              removeFromBasket={removeFromBasket}
              updateAmountInBasket={updateAmountInBasket}
            ></BeerForBasketView>
          ))
        ) : (
          <h2>Your basket is empty!</h2>
        )}
      </div>

      <p style={{ fontSize: "20px" }}>Total: {totalPrice} kr.</p>

      {/* form for table number + payment method */}
      <form onSubmit={(e) => updateOrderData(e)}>
        <label htmlFor="tablenumber">
          <h3>Tablenumber</h3>
          <p className="tableText">
            Find your table’s number on the sign in the middle of the table.
          </p>
          <p className="tableText">
            If left empty, bartenders will call your order number and the beers
            can be retrieved from the bar.{" "}
          </p>
          <input
            type="number"
            name="tablenumber"
            id="tablenumber"
            placeholder="xx"
            min="0"
            max="100"
            style={{
              width: "100px",
              marginBottom: "20px",
            }}
            onChange={(e) => {
              setTableNumber(e.target.value);
            }}
          />
          <span className="error" id="err-name" aria-live="assertive">
            Must be a number between 1 - 100
          </span>
        </label>

        <h3>Choose Payment Method</h3>
        {/* mapping over paymentmethods and making a radio button for each */}
        {paymentMethods.map((element) => {
          return (
            <RadioButton
              text={element}
              name="payment"
              key={element}
              onChange={setPaymentMethod}
            ></RadioButton>
          );
        })}
      </form>

      {/* Link to payment (disabled if empty basket) */}
      <Link to={basket.length > 0 ? "/payment" : ""}>
        <button
          className="orangeButton"
          disabled={basket.length === 0 || paymentMethod === ""}
        >
          {basket.length > 0 ? "Go To Payment" : "Your basket is empty"}
        </button>
      </Link>
    </div>
  );
}
