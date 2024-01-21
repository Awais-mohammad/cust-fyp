import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import bg3 from "../assect/images/bg/03.jpg";
import Footer from "../components/footer";
import {
  collection,
  getDocs,
  query,
  deleteDoc,
  orderBy,
  doc,
} from "firebase/firestore";
import Spinner from "../common/loading-spinner";
import RoutesEnums from "../enums/routes.enums";
import "../App.css";
import { FiArrowDownRight, FiCamera, FiDelete, FiHeart } from "react-icons/fi";
import { db } from "../config";

const pageSize = 6; // Adjust the page size as needed

export default function Blogs() {
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]); // Store all data from all pages
  const [currentPageData, setCurrentPageData] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [inputModal, setInputModal] = useState(false);


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
      // Get the length of the collection
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
      <Navbar
        navClass="defaultscroll sticky"
        logolight={true}
        menuClass="navigation-menu nav-left nav-light"
      />
      <section
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
                  Add Properties
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
      {localStorage.getItem("accessToken") && (
        <div className="row justify-content-center pt-4">
          <button
            onClick={() => {
              navigate(RoutesEnums.CREATE_BLOG);
            }}
            className="btn btn-primary"
            style={{ width: "200px" }}
          >
            + Add Property
          </button>
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
                      <img src={item.image} className="img-fluid" alt="" />
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

                        <li className="list-inline-item mb-0">
                          <span className="text-muted">Sold Price</span>
                          <p className="fw-medium mb-0">{item.soldPrice} PKR</p>
                        </li>

                        <li className="list-inline-item mb-0">
                          <span className="text-muted">Predicted Price</span>
                          <p className="fw-medium mb-0">5000 PKR</p>
                        </li>
                      </ul>
                      <div className="mt-4 d-flex justify-content-between">
                        <Link
                          to={`/property-detail/${item.id}`}
                          className="text-dark read-more"
                        >
                          View Property0{" "}
                          <i className="mdi mdi-chevron-right align-middle"></i>
                        </Link>
                        <button onClick={() => setInputModal(!inputModal)} className="badge bg-primary">Mark as Sold</button>
                        <div
                          className={`${inputModal === true ? "show" : ""
                            } dropdown-menu dd-menu dropdown-menu-start bg-white rounded-3 border-0 mt-3 p-0 right-0`}
                          style={{ width: "200px", right: "150px", bottom: "20px" }}
                        >
                          <div className="search-bar rounded-3 border bg-primary text-light">
                            <div id="itemSold" className="mb-0 d-flex align-items-center">
                              <input
                                type="text"
                                className="form-control border-0 bg-transparent"
                                name="s"
                                id="soldItem"
                                placeholder="Sold Price"
                              />
                                <FiArrowDownRight />
                            </div>
                          </div>
                        </div>

                      </div>


                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="row">
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
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
