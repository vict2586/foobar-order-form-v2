import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ProductView from "./ProductView";
import BasketView from "./BasketView";
import PaymentView from "./PaymentView";
import ThankYouView from "./ThankYouView";

function App() {
  // variabler med usestate
  const [beerTypes, setBeerTypes] = useState([]);
  const [taps, setTaps] = useState([]);
  const [basket, setBasket] = useState([]);
  const [tablenumber, setTableNumber] = useState(0);
  const [orderInfo, setOrderInfo] = useState();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [queueLenght, setQueueLenght] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);

  // useEffects fetching data + updating variables
  useEffect(() => {
    fetch("https://foobar-vas.herokuapp.com/beertypes")
      .then((res) => res.json())
      .then((data) => {
        setBeerTypes(data);
      });
  }, []);
  useEffect(() => {
    fetch("https://foobar-vas.herokuapp.com/")
      .then((res) => res.json())
      .then((data) => {
        setTaps(data.taps);
      });
  }, []);
  useEffect(() => {
    fetch("https://foobar-vas.herokuapp.com/")
      .then((res) => res.json())
      .then((data) => {
        setQueueLenght(data.queue.length);
      });
  }, [basket]);
  useEffect(() => {
    let updatedOrder = basket.map((item) => {
      let itemData = { name: item.name, amount: item.amount };
      return itemData;
    });
    setOrderInfo(updatedOrder);
  }, [basket]);

  // updating order number (used in paymentview)
  function updateOrderNumber(orderNumberValue) {
    setOrderNumber(orderNumberValue);
  }

  // updating basket functions
  function addToBasket(payload) {
    const inBasket = basket.findIndex((item) => item.name === payload.name);
    if (inBasket === -1) {
      //add payload to basket
      const nextPayload = { ...payload };
      nextPayload.amount = payload.amount;
      setBasket((prevState) => [...prevState, nextPayload]);
    } else {
      //if same beer is already in basket -> add to amount
      const nextBasket = basket.map((item) => {
        if (item.name === payload.name) {
          item.amount += payload.amount;
        }
        return item;
      });
      setBasket(nextBasket);
    }
  }
  function removeFromBasket(payload) {
    //TODO - read up on to see if more correct way
    const itemToRemove = basket.findIndex((item) => item.name === payload.name);
    basket.splice(itemToRemove, 1);
    setBasket((prevState) => [...prevState]);
  }
  function updateAmountInBasket(payload, action) {
    const nextBasket = basket.map((item) => {
      if (item.name === payload.name) {
        if (action === "+") {
          item.amount += 1;
        } else if (action === "-") {
          item.amount -= 1;
        }
      }
      return item;
    });
    setBasket(nextBasket);
  }
  function clearBasket() {
    setBasket([]);
  }

  // which beers are on tap and set those that aren't to soldOut = true in a copy, that's sorted by onTap first
  const beersOnTap = taps.map((tap) => tap.beer);
  let copy = beerTypes.map((item) => {
    item["isSoldOut"] = beersOnTap.indexOf(item.name) === -1 ? true : false;
    return item;
  });
  copy.sort((a, b) => {
    return a.isSoldOut - b.isSoldOut;
  });

  return (
    <Router
    // basename="/kea/frontend/foobar"
    >
      <div className="App">
        {/* background styled with wooden texture */}
        <div className="background"></div>
        {/* Generel content set up: HEADER + MAIN CONTENT pr ROUTE + FOOTER */}
        <Header basket={basket} queueLenght={queueLenght}></Header>
        <main>
          <Switch>
            {/* Product page */}
            <Route
              path="/"
              exact
              render={() => (
                <ProductView
                  addToBasket={addToBasket}
                  beerTypes={copy}
                  taps={taps}
                ></ProductView>
              )}
            />
            {/* Basket */}
            <Route
              path="/basket"
              render={() => (
                <BasketView
                  basket={basket}
                  removeFromBasket={removeFromBasket}
                  updateAmountInBasket={updateAmountInBasket}
                  setTableNumber={setTableNumber}
                  setPaymentMethod={setPaymentMethod}
                  paymentMethod={paymentMethod}
                ></BasketView>
              )}
            />
            {/* Payment */}
            <Route
              path="/payment"
              render={() => (
                <div>
                  <PaymentView
                    tablenumber={tablenumber}
                    orderInfo={orderInfo}
                    paymentMethod={paymentMethod}
                    basket={basket}
                    clearBasket={clearBasket}
                    updateOrderNumber={updateOrderNumber}
                  ></PaymentView>
                </div>
              )}
            />
            {/* Thank you for ordering view */}
            <Route
              path="/thanks"
              render={() => (
                <ThankYouView orderNumber={orderNumber}></ThankYouView>
              )}
            />
          </Switch>
        </main>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
