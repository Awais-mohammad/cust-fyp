import React from "react";
import { Link } from "react-router-dom";

import LogoBlue from "../assect/images/Real Estate Blue.png";

import {
  FiShoppingCart,
  FiDribbble,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiMapPin,
  FiPhone,
} from "../assect/icons/vander";

export default function Footer() {
  return (
    <>
      <footer className="bg-footer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-py-60 footer-border">
                <div className="row">
                  <div className="col-lg-5 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
                    <Link to="#" className="logo-footer">
                      <img style={{ height: "70px", width: "px" }} src={LogoBlue} alt="" />
                    </Link>
                    <p className="mt-2">
                      A great plateform to buy, sell and rent your properties
                      without any agent or commisions.
                    </p>
                    <ul className="list-unstyled social-icon foot-social-icon mb-0 mt-4">
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          target="_blank"
                          className="rounded-3"
                        >
                          <FiShoppingCart className="fea icon-sm align-middle" />
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          target="_blank"
                          className="rounded-3"
                        >
                          <FiDribbble className="fea icon-sm align-middle" />
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          target="_blank"
                          className="rounded-3"
                        >
                          <FiLinkedin className="fea icon-sm align-middle" />
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          target="_blank"
                          className="rounded-3"
                        >
                          <FiFacebook className="fea icon-sm align-middle" />
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="https://www.instagram.com"
                          target="_blank"
                          className="rounded-3"
                        >
                          <FiInstagram className="fea icon-sm align-middle" />
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          target="_blank"
                          className="rounded-3"
                        >
                          <FiTwitter className="fea icon-sm align-middle" />
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="rounded-3"
                        >
                          <FiMail className="fea icon-sm align-middle" />
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-2 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <h5 className="footer-head">Company</h5>
                    <ul className="list-unstyled footer-list mt-4">
                      <li>
                        <Link to="#" className="text-foot">
                          <i className="mdi mdi-chevron-right align-middle me-1"></i>{" "}
                          About us
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-foot">
                          <i className="mdi mdi-chevron-right align-middle me-1"></i>{" "}
                          Services
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-foot">
                          <i className="mdi mdi-chevron-right align-middle me-1"></i>{" "}
                          Team
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-foot">
                          <i className="mdi mdi-chevron-right align-middle me-1"></i>{" "}
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-foot">
                          <i className="mdi mdi-chevron-right align-middle me-1"></i>{" "}
                          Project
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-foot">
                          <i className="mdi mdi-chevron-right align-middle me-1"></i>{" "}
                          Careers
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-foot">
                          <i className="mdi mdi-chevron-right align-middle me-1"></i>{" "}
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-foot">
                          <i className="mdi mdi-chevron-right align-middle me-1"></i>{" "}
                          Login
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-2 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <h5 className="footer-head">Usefull Links</h5>
                    <ul className="list-unstyled footer-list mt-4">
                      <li>
                        <Link to="#" className="text-foot">
                          <i className="mdi mdi-chevron-right align-middle me-1"></i>{" "}
                          Terms of Services
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-foot">
                          <i className="mdi mdi-chevron-right align-middle me-1"></i>{" "}
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-foot">
                          <i className="mdi mdi-chevron-right align-middle me-1"></i>{" "}
                          Listing
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-foot">
                          <i className="mdi mdi-chevron-right align-middle me-1"></i>{" "}
                          Contact us
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <h5 className="footer-head">Contact Details</h5>

                    <div className="d-flex mt-4">
                      <FiMapPin className="fea icon-sm text-primary mt-1 me-3" />
                      <div className="">
                        <p className="mb-2">
                          DHA Phase-4, <br /> House - No 5, <br />{" "}
                          Karachi, Pakistan.
                        </p>
                        <Link
                          to="#"
                          data-type="iframe"
                          className="text-primary lightbox"
                        >
                          View on Google map
                        </Link>
                      </div>
                    </div>

                    <div className="d-flex mt-4">
                      <FiMail className="fea icon-sm text-primary mt-1 me-3" />
                      <Link
                        to="mailto:contact@example.com"
                        className="text-foot"
                      >
                        contact@example.com
                      </Link>
                    </div>

                    <div className="d-flex mt-4">
                      <FiPhone className="fea icon-sm text-primary mt-1 me-3" />
                      <Link to="tel:+152534-468-854" className="text-foot">
                        +92 53446885
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-py-30 footer-bar">
          <div className="container text-center">
            <div className="row">
              <div className="col">
                <div className="text-center">
                  <p className="mb-0">
                    © {new Date().getFullYear()} PierTop. Final Year Project
                    <i className="mdi mdi-heart text-danger"></i> by{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
