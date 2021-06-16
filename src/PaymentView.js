import BackButton from "./BackButton";
import { useHistory, Link } from "react-router-dom";
import BeerForPaymentView from "./BeerForPaymentView";
import React from "react";

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

  // -----------Card number spaceing-----------

  let oldValue;
  let oldCursor;
  let regex = new RegExp(/^\d{0,16}$/g);

  // Makes output array + add the separator
  let mask = function(value) {
    // Make output array
    let output = [];

      for(let i = 0; i < value.length; i++) {
        if(i !== 0 && i % 4 === 0) {
          output.push(" "); // add the separator
        }
        output.push(value[i]);
      }
      return output.join("");
  };

  // Remove every non-digit character
  let unmask = function(value) {
    let output = value.replace(new RegExp(/[^\d]/, 'g'), '');

    return output;
  };

  let checkSeparator = function(position, interval) {
    return Math.floor(position / (interval + 1));
  };

  // Gets the old values and curser posistion
  let keydownHandler = function(e) {
    let el = e.target;
    
    oldValue = el.value;
    oldCursor = el.selectionEnd;
  };

  // Makes the new output
  const inputHandler = function(e) {
    let el = e.target;
    let newCursorPosition;
    let newValue = unmask(el.value);
    
      if(newValue.match(regex)) {
        newValue = mask(newValue);
        
        newCursorPosition = oldCursor - checkSeparator(oldCursor, 4) + 
          checkSeparator(oldCursor + (newValue.length - oldValue.length), 4) + 
            (unmask(newValue).length - unmask(oldValue).length);
                
        if(newValue !== "") {
          el.value = newValue;

        } else {
          el.value = "";
        }

      } else {
        el.value = oldValue;
        newCursorPosition = oldCursor;
      }

    el.setSelectionRange(newCursorPosition, newCursorPosition);
  };

  // -----------Expire date jumbing-----------

  const movetoNext = function(e) {
    let el = e.target;

    if (el.getAttribute && el.value.length === el.maxLength) {
        document.querySelector(".expirationDateY").focus();
    }
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
              <b>Card number</b>
              <input
                type="text"
                name="cardNumber"
                id="cardNumber"
                className="cc-number-input"
                autoComplete="xyz"
                placeholder="XXXX XXXX XXXX XXXX"
                minLength="16"
                maxLength="19"
                min="0000 0000 0000 0000"
                max="9999 9999 9999 9999"
                pattern="[0-9 ]{19}"
                onKeyDown={keydownHandler}
                onInput={inputHandler}
                required
              />
              <span className="error" id="err-name" aria-live="assertive">
                Must be 16 numbers
              </span>
            </label>

            <label htmlFor="nameOnCard">
              <b>Name on card</b>
              <p className="inputText">Type in the full name on the card</p>
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
              <b>Expiration date</b>
              <p className="inputText">The month / The year</p>
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
                  id="expirationDateM"
                  autoComplete="xyz"
                  placeholder="Month"
                  maxLength="2"
                  onChange={movetoNext} 
                  pattern="(?:0[0-9]|1[0-2])"
                  required
                />
                <p style={{
                  margin: "0 10px 0 10px",
                }}> / </p>
                <input
                  type="text"
                  name="expirationDateY"
                  id="expirationDateY"
                  className="expirationDateY"
                  autoComplete="xyz"
                  placeholder="Year"
                  maxLength="2"
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
              <b>CVV</b>
              <p className="inputText">The three numbers on the back of the card</p>
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
