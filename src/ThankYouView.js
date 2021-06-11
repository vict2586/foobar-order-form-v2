import BackButton from "./BackButton";

export default function ThankYouView({ orderNumber }) {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <a href="https://skovgaart.dk/kea/foobar_final/index.html">
        <BackButton text={" to frontpage"}></BackButton>
      </a>
      <section className="placeContent">
        <div className="textAlign">
          <h1 className="bigText">Thank you for your order!</h1>
        </div>

        <div className="textAlign">
          <h2>Your order is on the way.</h2>
          <h2 className="colorOrange">Your order number is:</h2>
          <h2 className="colorOrange">{orderNumber}</h2>
        </div>

        <div className="placeText">
          <p>
            If you wish to inquire about your order please get in contact with
            our bartenders and tell them your order number.
          </p>
        </div>

        <div className="placeButton">
          <a href="https://skovgaart.dk/kea/foobar_final/index.html">
            <button className="orangeButton">Back to frontpage</button>
          </a>
        </div>
      </section>
    </div>
  );
}
