import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="wid">
      <div className="container">
        <footer className="text-center text-lg-start bg-#27292a text-light pt-5">
          {/* Section: Social media */}
          <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom mt-0">
            {/* Left */}
            <div className="me-5 d-none d-lg-block">
              <span>Get connected with us on social networks:</span>
            </div>
            {/* Right */}
            <div>
              <a href="#" className="me-4 text-reset text-light">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="me-4 text-reset text-light">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="me-4 text-reset text-light">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="me-4 text-reset text-light">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </section>

          {/* Section: Links */}
          <section className="mt-5">
            <div className="container text-center text-md-start ">
              <div className="row mt-3">
                {/* Company Info */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-birthday-cake me-3"></i>Cake Store
                  </h6>
                  <p>
                    Delight in our handcrafted cakes, baked fresh daily with
                    love and the finest ingredients. Perfect for every occasion!
                  </p>
                </div>

                {/* Products */}
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                  <p>
                    <a href="#!" className="text-reset text-light">
                      Birthday Cakes
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset text-light">
                      Wedding Cakes
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset text-light">
                      Anniversary Cakes
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset text-light">
                      Seasonal Cakes
                    </a>
                  </p>
                </div>

                {/* Useful Links */}
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
                  <p>
                    <a href="#!" className="text-reset text-light">
                      Home
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset text-light">
                      Cart
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset text-light">
                      Profile
                    </a>
                  </p>
                </div>

                {/* Contact Info */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                  <p>
                    <i className="fas fa-home me-3"></i> Moratuwa, No.141, LK
                  </p>
                  <p>
                    <i className="fas fa-envelope me-3"></i>
                    cakestore@gmail.com
                  </p>
                  <p>
                    <i className="fas fa-phone me-3"></i> + 01 234 567 88
                  </p>
                  <p>
                    <i className="fas fa-print me-3"></i> + 01 234 567 89
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Copyright */}
          <div
            className="text-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2024 Copyright:
            <a className="text-reset fw-bold" href="https://cakestore.com/">
              CakeStore.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
