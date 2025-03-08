import background from "./images/background-app.png"; // Adjust path if needed

const BackgroundImage = () => {
  return (
    <div
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 0,
  }}
>
  <img
    src={background}
    alt="Background"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />
</div>

  );
};

export default BackgroundImage;
