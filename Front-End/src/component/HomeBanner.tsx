import React from "react";
import BannerImage from "../assets/HomeBanner.png"; // Replace with your image path

const HomeBanner = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundImage: `url(${BannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "#fff",
        padding: "0 50px",
        marginTop: "50px",
      }}
    >
      {/* Text Section */}
      <div style={{ maxWidth: "50%" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            fontFamily: "'Playfair Display', serif",
            lineHeight: "1.2",
            color: "#FFCF86",
          }}
        >
          Making your <br />
          SPECIAL MOMENTS
          <br />
          unforgettable
        </h1>
        <div style={{ maxWidth: "85%" }}>
          <p
            style={{ fontSize: "1.2rem", marginTop: "20px", lineHeight: "1.5" }}
          >
            Indulge in our homemade cakes, baked fresh daily with the finest
            ingredients. From classic favorites to unique flavor combinations,
            we have a cake for every occasion. Custom designs and special
            requests are always welcome.
          </p>
        </div>

        <div style={{ marginTop: "30px" }}>
          <a href="/login">
            <button
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                backgroundColor: "#FFCF86",
                color: "#000",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </a>
        </div>
      </div>

      {/* Empty Section for Spacing */}
      <div style={{ flex: 1 }}></div>
    </div>
  );
};

export default HomeBanner;
