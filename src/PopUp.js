export default function PopUp({ togglePopup, popupInfo }) {
  return (
    <section
      className="popup"
      style={{
        position: "fixed",
        backgroundColor: "#00000090",
        height: "100vh",
        width: "100vw",
        top: "0",
        left: "0",
        zIndex: "4",
        padding: "15vh 15vw",
      }}
    >
      <article
        style={{
          backgroundColor: "white",
          color: "black",
          padding: "20px 20px 40px 20px",
          height: "100%",
          overflowY: "scroll",
        }}
      >
        <button
          style={{
            position: "fixed",
            top: "14vh",
            left: "82vw",
            backgroundColor: "black",
            color: "white",
            border: "solid white 1px",
            padding: "5px",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={(e) => togglePopup()}
        >
          X
        </button>

        {popupInfo.map((info) => (
          <div
            key={info.label}
            style={{
              padding: "5px 0 20px",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
              }}
            >
              {info.label}
            </h2>
            <p>{info.content}</p>
          </div>
        ))}
      </article>
    </section>
  );
}
