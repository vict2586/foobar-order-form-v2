export default function BeerForPaymentView({ info }) {
  return (
    <article
      style={{
        padding: "5px",
        background: "#0D0601",
        border: "1px solid #FFFFFF50",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* image */}
        <div
          style={{
            flexBasis: "100px",
            flexGrow: "2",
            color: "white",
            width: "100px",
            backgroundImage: "url('./images/" + info.label + "')",
            backgroundSize: "cover",
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
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* name */}
            <h2
              style={{
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "normal",
                letterSpacing: "0.1em",
                fontSize: "1rem",
              }}
            >
              {info.name}
            </h2>
            {/* details */}
            <p
              style={{
                fontFamily: "Roboto",
                fontSize: "0.7rem",
              }}
            >
              {info.amount} stk.: {info.amount * 25} kr.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
