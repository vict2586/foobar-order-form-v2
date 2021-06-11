import BackButton from "./BackButton";
import { useHistory, Link } from "react-router-dom";
import BeerForPaymentView from "./BeerForPaymentView";

export default function PaymentView({
  tablenumber,
  orderInfo,
  paymentMethod,
  basket,
  clearBasket,
  updateOrderNumber,
}) {
  let history = useHistory();
  const submitHandler = (e) => {
    // if e is undefined it's because the payment method isn't credit card witch means there's no credit card info to post
    if (e !== undefined) {
      e.preventDefault();
      post(e.target);
    }
    postToHeroku();
    clearBasket();
    history.push("/thanks");
  };

  let totalPrice = 0;
  basket.map((product) => (totalPrice += product.amount * 25));

  async function post(form) {
    const postData = JSON.stringify({
      cardNumber: form.elements.cardNumber.value,
      nameOnCard: form.elements.nameOnCard.value,
      expirationDateM: form.elements.expirationDateM.value,
      expirationDateY: form.elements.expirationDateY.value,
      cvv: form.elements.cvv.value,
      order: orderInfo,
      tableNumber: tablenumber,
      paymentMethod: paymentMethod,
      pris: totalPrice,
    });
    const jsonData = await fetch("https://exsam3sem-dfd1.restdb.io/rest/beer", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "60990365e3b6e02545eda659",
        "cache-control": "no-cache",
      },
      body: postData,
    });

    const jsonObject = await jsonData.json();

    console.log(jsonObject);
  }

  async function postToHeroku() {
    const postData = JSON.stringify(orderInfo);
    console.log(postData);

    const response = await fetch("https://foobar-vas.herokuapp.com/order", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: postData,
    });

    const jsonObjectTwo = await response.json();

    updateOrderNumber(jsonObjectTwo.id);

    console.log(jsonObjectTwo.id);
  }

  return (
    <section className="placeContent">
      <Link to="/basket">
        <BackButton></BackButton>
      </Link>

      {paymentMethod === "Credit Card" ? (
        <div>
          <h2>Add payment details and review order</h2>

          <div
            style={{
              display: "grid",
              padding: "10px",
              margin: "10px 0",
              gridTemplateColumns: "repeat(auto-fill, minmax(100%, 1fr))",
              border: "solid white 1px",
            }}
          >
            <h3>Order details</h3>

            {basket.length !== 0 ? (
              basket.map((product) => (
                <BeerForPaymentView
                  info={product}
                  key={product.name}
                ></BeerForPaymentView>
              ))
            ) : (
              <h2>Your basket is empty!</h2>
            )}

            <h3>
              Total: <span className="totalPrice">{totalPrice} kr.</span>
            </h3>
            <h3>
              Table number: <span className="tableNumber">{tablenumber}</span>
            </h3>
          </div>

          <form onSubmit={submitHandler}>
            <label htmlFor="cardNumber">
              Card number
              <input
                type="text"
                name="cardNumber"
                id="cardNumber"
                autoComplete="xyz"
                placeholder="XXXX XXXX XXXX XXXX"
                minLength="16"
                maxLength="19"
                min="0000 0000 0000 0000"
                max="9999 9999 9999 9999"
                pattern="[0-9 ]{16,19}"
                required
              />
              <span className="error" id="err-name" aria-live="assertive">
                Can't be letters and must be 16 numbers
              </span>
            </label>

            <label htmlFor="nameOnCard">
              Name on card
              <input
                type="text"
                name="nameOnCard"
                id="nameOnCard"
                autoComplete="xyz"
                placeholder="Full name"
                pattern="[a-zA-Z ]+"
                required
              />
              <span className="error" id="err-name" aria-live="assertive">
                Can not contain numbers
              </span>
            </label>

            <label htmlFor="expirationDate">
                Expiration date
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                alignItems: "center",
                width: "95%",
              }}>
                <input
                  type="text"
                  name="expirationDateM"
                  id="expirationDate"
                  autoComplete="xyz"
                  placeholder="Month"
                  pattern="(?:0[0-9]|1[0-2])"
                  required
                />
                <p style={{
                  margin: "0 10px 0 10px",
                }}> / </p>
                <input
                  type="text"
                  name="expirationDateY"
                  id="expirationDate"
                  autoComplete="xyz"
                  placeholder="Year"
                  pattern="(?:2[0-9]|0[0-9])"
                  required
                />
                <span className="errorDate" id="err-name" aria-live="assertive" style={{
                  margin: "5px 0 10px 0",
                }}>
                  <p>
                    The first is the month the second is the year
                  </p>
                  <p>
                    The month has to be between 01 - 12
                  </p> 
                  <p>
                    The year has to be between 20 - 29
                  </p>
                </span>
              </div>
            </label>

            <label htmlFor="cvv">
              CVV
              <input
                type="number"
                name="cvv"
                id="cvv"
                placeholder="XXX"
                min="000"
                max="999"
                required
              />
              <span className="error" id="err-name" aria-live="assertive">
                Can't be letters, must be 3 numbers long
              </span>
            </label>

            <button type="submit" className="orangeButton">
              Place order
            </button>
          </form>
        </div>
      ) : (
        // If payment isn't credit card
        <div>
          <h2>
            This is a prototype, so you won't be directed to your chosen payment
            method. Please click place order to move on.
          </h2>

          <button
            className="orangeButton"
            onClick={() => submitHandler(undefined)}
          >
            Place Order
          </button>
        </div>
      )}
    </section>
  );
}
