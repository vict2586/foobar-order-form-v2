import { Link } from "react-router-dom";

export default function Header({ basket, queueLenght }) {
  let basketAmount = 0;
  basket.map((product) => (basketAmount += product.amount));

  return (
    <header
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "20px 20px 0 20px",
      }}
    >
      <div
        style={{
          width: "25%",
          maxWidth: "60px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <svg
          style={{ width: "40px", height: "40px" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="400 400 410 410"
        >
          <g id="black-white">
            <g id="three" fill="white">
              <path
                stroke="white"
                strokeWidth="5"
                d="M948.2,502a21.49,21.49,0,0,0-8-11.73c-4.52-3.37-11.15-4.19-12-4.19H867.72c-.8,0-7.43.82-12,4.19a21.49,21.49,0,0,0-8,11.73,46.71,46.71,0,0,0-.8,7.55V588c0,4.86,4,8.8,10,8.8,5.77,0,10.46-3.72,10.73-8.38h0v-78.8h5.58V683.94l0,.84c0,.14,0,.28,0,.42,0,4.86,4.81,8.8,10.75,8.8s10.76-3.94,10.76-8.8c0-.14,0-1.12,0-1.26l0,.84V582.51h6.38V684.78l0-.84c0,.14,0,1.12,0,1.26,0,4.86,4.81,8.8,10.76,8.8s10.75-3.94,10.75-8.8c0-.14,0,.56,0,.42l0-1.68V509.58h5.58v78.8h0c.27,4.66,5,8.38,10.73,8.38,5.94,0,10-3.94,10-8.8V509.58A46.71,46.71,0,0,0,948.2,502Z"
                transform="translate(-443 -19)"
              />
              <ellipse
                stroke="white"
                strokeWidth="5"
                cx="454.2"
                cy="441.12"
                rx="19.13"
                ry="20.12"
              />
            </g>
            <g id="two" fill="white">
              <path
                stroke="white"
                strokeWidth="5"
                d="M1047.06,501.36c-1.06-4.46-4.49-9.67-9.37-13.12-5.32-3.76-13.13-4.69-14.07-4.69H952.38c-.94,0-8.75.93-14.07,4.69-4.88,3.45-8.31,8.66-9.37,13.12a49.13,49.13,0,0,0-.94,8.44v87.63c0,5.44,4.73,9.84,11.72,9.84,6.79,0,12.31-4.15,12.62-9.37h0V509.8h6.56v195l0,.94c0,.16,0,.31,0,.47,0,5.43,5.66,9.84,12.65,9.84s12.66-4.41,12.66-9.84c0-.16,0-1.25,0-1.41l0,.94V591.34h7.5V705.69l0-.94c0,.16,0,1.25,0,1.41,0,5.43,5.67,9.84,12.66,9.84s12.65-4.41,12.65-9.84c0-.16,0,.62,0,.47l0-1.88V509.8h6.56v88.1h0c.31,5.22,5.83,9.37,12.62,9.37,7,0,11.72-4.4,11.72-9.84V509.8A49.13,49.13,0,0,0,1047.06,501.36Z"
                transform="translate(-443 -19)"
              />
              <ellipse
                stroke="white"
                strokeWidth="5"
                cx="544.06"
                cy="435.5"
                rx="22.5"
                ry="22.5"
              />
            </g>
            <g id="one" fill="white">
              <path
                stroke="white"
                strokeWidth="5"
                d="M1151,503c-1.14-4.76-4.79-10.32-10-14-5.67-4-14-5-15-5h-76c-1,0-9.33,1-15,5-5.21,3.68-8.86,9.24-10,14a52.57,52.57,0,0,0-1,9v93.5c0,5.8,5,10.5,12.5,10.5,7.24,0,13.13-4.43,13.47-10h0V512h7V720l0,1c0,.17,0,.33,0,.5,0,5.8,6,10.5,13.5,10.5s13.5-4.7,13.5-10.5c0-.17,0-1.33,0-1.5l0,1V599h8V721l0-1c0,.17,0,1.33,0,1.5,0,5.8,6,10.5,13.5,10.5s13.5-4.7,13.5-10.5c0-.17,0,.67,0,.5l0-2V512h7v94h0c.34,5.57,6.23,10,13.47,10,7.46,0,12.5-4.7,12.5-10.5V512A52.57,52.57,0,0,0,1151,503Z"
                transform="translate(-443 -19)"
              />
              <circle stroke="white" strokeWidth="5" cx="644" cy="434" r="24" />
            </g>
          </g>
        </svg>
        <p
          style={{
            fontSize: "0.8rem",
            paddingTop: "10px",
          }}
        >
          x {queueLenght}
        </p>
      </div>
      <div>
        <a href="https://skovgaart.dk/kea/foobar_final/index.html">
          <h1
            style={{
              fontFamily: "Rasa, serif",
              fontStyle: "normal",
              fontWeight: "300",
              width: "50%",
              fontSize: "48px",
              lineHeight: "58px",
              textAlign: "center",
              letterSpacing: "0.155em",
              color: "#FFFFFF",
              textShadow: "1px 1px 0px rgba(250, 235, 222, 0.21)",
            }}
          >
            FooBar
          </h1>
        </a>
      </div>

      <Link to="/basket">
        <div
          style={{
            width: "25%",
            maxWidth: "60px",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <svg
            style={{
              width: "40px",
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 300"
          >
            <g stroke="white" strokeWidth="7" id="cart-white">
              <rect x="29.25" y="121.87" width="182.25" height="25.25" />
              <path
                d="M476.25,166.12l24.13,81.24a7,7,0,0,0,6.71,5H616.6a7,7,0,0,0,6.68-4.91l25.47-81.09Z"
                transform="translate(-443 -19)"
              />
              <line x1="48.5" y1="121.87" x2="94.75" y2="63.37" />
              <line x1="144.96" y1="63.37" x2="191.29" y2="121.87" />
              <line x1="79.25" y1="168.87" x2="86.25" y2="209.87" />
              <line x1="119.5" y1="168.87" x2="119.5" y2="209.87" />
              <line x1="159.43" y1="168.87" x2="152.68" y2="209.87" />
            </g>
          </svg>
          <p
            style={{
              position: "relative",
              top: "-25px",
              left: "15px",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              borderRadius: "50%",
              color: "white",
              width: "22px",
              height: "22px",
              textAlign: "center",
            }}
          >
            {basketAmount}
          </p>
        </div>
      </Link>
    </header>
  );
}
