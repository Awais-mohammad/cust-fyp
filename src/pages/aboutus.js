import React, { useState } from "react";
import { Link } from "react-router-dom";

import bg3 from "../assect/images/bg/03.jpg";
import heroImg from "../assect/images/hero.jpg";
import dots from "../assect/images/svg/dots.svg";
import image1 from "../assect/images/1.jpg";
import map from "../assect/images/map.png";
import avatar from "../assect/images/client/08.jpg";
import company from "../assect/images/company.jpg";
import church from "../assect/images/church.jpg";

import Navbar from "../components/navbar";
import About from "../components/about";
import Broker from "../components/broker";
import Blog from "../components/blog";
import GetInTuch from "../components/getInTuch";

import ModalVideo from "react-modal-video";
import "../../node_modules/react-modal-video/css/modal-video.css";

import CountUp from "react-countup";
import Footer from "../components/footer";

export default function AboutUs() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: `url(${bg3})` }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                {/* <p className="text-white-50 para-desc mx-auto mb-0">
                  Our story: Piertop
                </p> */}
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  About Us
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="about-left">
                <div className="position-relative shadow p-2 rounded-top-pill rounded-5 bg-white img-one">
                  <img
                    src={church}
                    className="img-fluid rounded-top-pill rounded-5"
                    alt=""
                  />
                </div>

                {/* <div className="img-two shadow rounded-3 overflow-hidden p-2 bg-white">
                  <img src={image1} className="img-fluid rounded-3" alt="" />
                </div> */}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="section-title ms-lg-5">
                <h4 className="title mb-3">
                  We are about Housing God’s people
                </h4>
                <p className="text-muted para-desc mb-0">
                  Integrity coupled with performance; PierTop is committed to
                  delivering excellence in all facets of church real estate
                  needs. PierTop bridges passion and expertise while holding
                  true to the believe that every decision should to promote
                  ministry. Created with ministry in mind, we exploit synergy
                  between industry proficiencies and theoretical competencies in
                  order to deliver superior results in by providing customized
                  real estate solutions that align with your distinctive vision
                  and mission. We take holistic approach to religious properties
                  and offer a range of services, including selling, buying,
                  leasing, consulting, investing, property valuation, property
                  management, and services, to help you make informed decisions
                  about your church property.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="section-title">
                <h4 className="title mb-3">Our mission is ministry</h4>
                <p className="text-muted para-desc mb-0">
                  We exist to fuel Ministry. Our mission is to empower
                  ministries by providing exceptional real estate solutions,
                  ensuring that they have the ideal spaces to thrive and fulfill
                  their sacred missions and create lasting positive impacts
                  within their communities and throughout the world
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="about-right">
                <div className="position-relative shadow p-2 rounded-top-pill rounded-5 bg-white img-one">
                  <img
                    src={company}
                    className="img-fluid rounded-top-pill rounded-5"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="about-left">
                <div className="position-relative shadow p-2 rounded-top-pill rounded-5 bg-white img-one">
                  <img
                    src={image1}
                    className="img-fluid rounded-top-pill rounded-5"
                    alt=""
                  />
                </div>

                {/* <div className="img-two shadow rounded-3 overflow-hidden p-2 bg-white">
                  <img src={vision} className="img-fluid rounded-3" alt="" />
                </div> */}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="section-title ms-lg-5">
                <h4 className="title mb-3">
                  Our vision is the success of your vision
                </h4>
                <p className="text-muted para-desc mb-0">
                  Our unwavering vision is to be a cornerstone in supporting and
                  enhancing the growth and vitality of faith-based
                  organizations. We envision a world where ministries have
                  access to the perfect property, enabling them to expand their
                  reach, deepen their impact, and thrive in their sacred
                  callings. We aim to be the foremost innovators in the realm of
                  religious real estate, dedicated to providing the perfect
                  spaces and solutions that empower every ministry to not only
                  endure but to truly flourish in their sacred vision. We are
                  committed to a world where spiritual growth, community, and
                  lasting impact are at the heart of our endeavors, leaving an
                  indelible mark on the lives of those we serve.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="section-title">
                <h4 className="title mb-3">The company</h4>
                <p className="text-muted para-desc mb-0">
                  Founded on the yearning and zeal to serve through real estate
                  PierTop was incorporated in 200.. Drivne by the need to do the
                  most good it morphed into serving those who serve others. More
                  pointedly we grew into a firm that servrse those who carry the
                  work of equipping people to live well, bless others and make a
                  difference in the world. In helping those who do the highest
                  good piertop has acquire its identy, and purpose.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="about-right">
                <div className="position-relative shadow p-2 rounded-top-pill rounded-5 bg-white img-one">
                  <img
                    src={company}
                    className="img-fluid rounded-top-pill rounded-5"
                    alt=""
                  />
                </div>

                {/* <div className="img-two shadow rounded-3 overflow-hidden p-2 bg-white">
                  <img src={image1} className="img-fluid rounded-3" alt="" />
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="about-left">
                <div className="position-relative shadow p-2 rounded-top-pill rounded-5 bg-white img-one">
                  <img
                    src={avatar}
                    className="img-fluid rounded-top-pill rounded-5"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="section-title ms-lg-5">
                <h4 className="title mb-3">Leadership (Jacques Pierrilus)</h4>
                <p className="text-muted para-desc mb-0">
                  Jacques’ most important life work is his investment in being a
                  father and husband. He is a men ministry leader and speaker
                  with a heart for building stronger families and communities.
                  He has been proudly serving his community for over a decade in
                  asset management matters. Prior to his current role at
                  PierTop, he has held various executive positions in financial
                  and real estate industry. Jacques holds a Master of Science in
                  Entrepreneurship and Applied Technologies from the University
                  of South Florida. From Florida International University he
                  holds a Master of Science in International Real Estate and
                  Bachelors in Finance. Jacques is a prolific researcher and
                  perpetual learner. His professional goal is to provide results
                  with integrity and influence those he serves to be socially
                  responsible.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid bg-building-pic mt-100 mt-60">
          <div
            className=" opacity-25 position-absolute w-100 h-100 top-0 start-0"
            style={{
              backgroundImage: `url(${map})`,
              backgroundPosition: "center",
            }}
          ></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col">
                <div className="section-title text-center mb-4 pb-2">
                  <h4 className="title mb-3">Trusted by more than 10K users</h4>
                  <p className="text-muted para-desc mb-0 mx-auto">
                    A great plateform to buy, sell and rent your properties
                    without any agent or commisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4 py-3">
                <div className="counter-box text-center">
                  <h1 className="mb-0 fw-semibold">
                    <CountUp start={0} end={1548} className="counter-value" />+
                  </h1>
                  <h6 className="counter-head text-muted fw-normal">
                    Investment
                  </h6>
                </div>
              </div>

              <div className="col-4 py-3">
                <div className="counter-box text-center">
                  <h1 className="mb-0 fw-semibold">
                    <CountUp start={0} end={25} className="counter-value" />+
                  </h1>
                  <h6 className="counter-head text-muted fw-normal">Awards</h6>
                </div>
              </div>

              <div className="col-4 py-3">
                <div className="counter-box text-center">
                  <h1 className="mb-0 fw-semibold">
                    <CountUp start={0} end={9} className="counter-value" />+
                  </h1>
                  <h6 className="counter-head text-muted fw-normal">
                    Profitability
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-100 mt-60">
          <GetInTuch />
        </div>
      </section>
      <Footer />
    </>
  );
}
