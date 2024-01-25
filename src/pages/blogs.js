import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import bg3 from "../assect/images/bg/03.jpg";
import Footer from "../components/footer";
import whatsappLogo from '../assect/images/WhatsApp.png';
import {
  collection,
  getDocs,
  setDoc,
  query,
  deleteDoc,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";

import Spinner from "../common/loading-spinner";
import RoutesEnums from "../enums/routes.enums";
import "../App.css";
import { FiCamera, FiDelete, FiHeart } from "react-icons/fi";
import { db } from "../config";

const pageSize = 6; // Adjust the page size as needed

export default function Blogs({ onHome, isSeller }) {
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [salePrice, setSalePrice] = useState();
  const user = localStorage.getItem('userName')

  let navigate = useNavigate();

  useEffect(() => {
    getCollectionLength();
  }, []);

  const getCollectionLength = async () => {
    setLoading(true)
    const q = query(collection(db, "property"), orderBy("date"));
    try {
      setLoading(true)
      const querySnapshot = await getDocs(q);
      const collectionLength = querySnapshot.size;
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllData(newData);
      setCurrentPageData(newData.slice(0, pageSize));

      setTotalBlogs(collectionLength);
    } catch (error) {
      console.error("Error getting collection length:", error);
    }
    finally {
      setLoading(false)
    }
  };

  const handleDelete = async (id) => {
    try {
      const propertyRef = doc(db, "property", id);

      await deleteDoc(propertyRef);

      setAllData((prevAllData) => prevAllData.filter((item) => item.id !== id));
      setCurrentPageData((prevPageData) =>
        prevPageData.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleSold = (item) => {
    const newData = [...allData];
    let trueIndex = newData.findIndex(data => data.id === item.id)
    newData[trueIndex].isSold = true;
    setAllData(newData);
    setCurrentPageData(newData.slice((selectedPage - 1) * pageSize, selectedPage * pageSize));

  }

  const handleSale = async (item) => {
    const prop = await doc(db, "property", item.id);
    await updateDoc(prop, {
      salePrice: salePrice,
      isSold: true
    }).then(res => {
      const newData = [...allData];
      let trueIndex = newData.findIndex(data => data.id === item.id)
      newData[trueIndex].salePrice = salePrice;
      newData[trueIndex].isSold = true;
      setAllData(newData);
      setCurrentPageData(newData.slice((selectedPage - 1) * pageSize, selectedPage * pageSize));
    }
    );
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = '+923168807850';
    const message = `Hello, this is a message from ${localStorage.getItem("userName")} from Real Estate Predictor. I am interested in bying your Property.`;

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  const calculateTotalPages = () => {
    return Math.ceil(totalBlogs / pageSize);
  };
  const maxLength = 30;

  const renderDescription = (description) => {
    const strippedDescription = description.replace(/<[^>]*>/g, "");
    if (strippedDescription?.length <= maxLength) {
      return strippedDescription;
    } else {
      return `${strippedDescription?.slice(0, maxLength)}...`;
    }
  };

  const renderPaginationLinks = () => {
    const totalPages = calculateTotalPages();
    const paginationLinks = [];

    for (let i = 1; i <= totalPages; i++) {
      paginationLinks.push(
        <li
          className={`page-item ${i === selectedPage ? "active" : ""}`}
          key={i}
          onClick={() => goToPage(i)}
        >
          <Link className="page-link" to="#">
            {i}
          </Link>
        </li>
      );
    }
    return paginationLinks;
  };

  const goToPage = (pageNumber) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setCurrentPageData(allData.slice(startIndex, endIndex));
    setSelectedPage(pageNumber);
  };

  return (
    <>
      {loading && <Spinner />}
      {!onHome && <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: `url(${bg3})` }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <p className="text-white-50 para-desc mx-auto mb-0">
                  Listing
                </p>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  {isSeller ? "Add Properties" : "Properties for Sale"}
                </h5>
              </div>
            </div>
          </div>
          <div className="position-middle-bottom">
            <nav aria-label="breadcrumb" className="d-block">
              <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                <li className="breadcrumb-item">
                  <Link to="/">Piertop</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Blog
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>}
      {!onHome && <div className="position-relative">
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
      </div>}
      {localStorage.getItem("accessToken") && !onHome && (
        <div className="row justify-content-center pt-4">
          {isSeller && <button
            onClick={() => {
              navigate(RoutesEnums.CREATE_BLOG);
            }}
            className="btn btn-primary"
            style={{ width: "200px" }}
          >
            + Add Property
          </button>}
        </div>
      )}
      <section className="section">
        <div className="container">
          <div className="row g-4">
            {currentPageData.map((item, index) => {

              return (
                <div className="col-lg-4 col-md-6 col-12" key={index}>
                  <div className="card property border-0 shadow position-relative overflow-hidden rounded-3">
                    <div className="property-image position-relative overflow-hidden shadow">
                      <img src={item.images[0]} className="img-fluid" alt="" />
                      <ul className="list-unstyled property-icon">
                        <li onClick={() => handleDelete(item.id)} className=""><Link to="#" className="btn btn-sm btn-icon btn-pills btn-primary"><FiDelete className="icons" /></Link></li>
                        <li className="mt-1"><Link to="#" className="btn btn-sm btn-icon btn-pills btn-primary"><FiHeart className="icons" /></Link></li>
                        <li className="mt-1"><Link to="#" className="btn btn-sm btn-icon btn-pills btn-primary"><FiCamera className="icons" /></Link></li>
                      </ul>
                    </div>
                    <div className="card-body content p-4">
                      <Link to={`/property-detail/${item.id}`} className="title fs-5 text-dark fw-medium">{item.title}</Link>

                      <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                        <li className="d-flex align-items-center me-3">
                          <i className="mdi mdi-arrow-expand-all fs-5 me-2 text-primary"></i>
                          <span className="text-muted">{item.area} sqf</span>
                        </li>

                        <li className="d-flex align-items-center me-3">
                          <i className="mdi mdi-bed fs-5 me-2 text-primary"></i>
                          <span className="text-muted">{item.beds} Beds</span>
                        </li>

                        <li className="d-flex align-items-center">
                          <i className="mdi mdi-shower fs-5 me-2 text-primary"></i>
                          <span className="text-muted">{item.baths} Baths</span>
                        </li>
                      </ul>
                      <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                        <li className="list-inline-item mb-0">
                          <span className="text-muted">Asked Price</span>
                          <p className="fw-medium mb-0">{item.askedPrice} PKR</p>
                        </li>
                        {item.salePrice && <li className="list-inline-item mb-0">
                          <span className="text-muted">Sold Price</span>
                          <p className="fw-medium mb-0">{item.salePrice} PKR</p>
                        </li>}
                        <li className="list-inline-item mb-0">
                          <span className="text-muted">Predicted Price</span>
                          <p className="fw-medium mb-0">{item.predictedPrice} PKR</p>
                        </li>
                      </ul>
                      <div className="mt-4 d-flex justify-content-between">
                        <Link
                          to={`/property-detail/${item.id}`}
                          className="text-dark read-more"
                        >
                          View Property{" "}
                          <i className="mdi mdi-chevron-right align-middle"></i>
                        </Link>
                        {!item.isSold && !isSeller && <img onClick={handleWhatsAppClick} style={{ width: '60px', cursor: 'pointer' }} src={whatsappLogo} alt="WhatsApp Logo" />}
                        {!item.isSold && item.author === user && isSeller && <button onClick={() => { handleSold(item) }} className="badge bg-primary">Mark as Sold</button>}
                        {item.isSold && !item.salePrice && <div className="d-flex flex-column" style={{ width: "45%" }}>
                          <input className="rounded" onChange={(e) => {
                            setSalePrice(e.target.value)
                          }} placeholder="Enter sale price" />
                          <button
                            onClick={() => {
                              handleSale(item);
                            }}
                            className="badge bg-primary mt-2 align-self-end"
                            style={{ width: "40%" }}
                          >Sell</button>
                        </div>}
                        {item.isSold && item.salePrice && <button className="badge bg-primary">Sold</button>}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {!onHome && <div className="row">
            <div className="col-12 mt-4 pt-2">
              <ul className="pagination justify-content-center mb-0">
                <li className="page-item">
                  <Link className="page-link" to="#" aria-label="Previous">
                    <span aria-hidden="true">
                      <i className="mdi mdi-chevron-left fs-6"></i>
                    </span>
                  </Link>
                </li>

                {renderPaginationLinks()}

                <li className="page-item">
                  <Link className="page-link" to="#" aria-label="Next">
                    <span aria-hidden="true">
                      <i className="mdi mdi-chevron-right fs-6"></i>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>}
        </div>
      </section>
      {!onHome && <Footer />}
    </>
  );
}
