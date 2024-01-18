import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import bg3 from "../assect/images/bg/03.jpg";
import Footer from "../components/footer";
import { db } from "../config";
import {
  collection,
  getDocs,
  query,
  startAfter,
  limit,
  orderBy,
} from "firebase/firestore";
import Spinner from "../common/loading-spinner";
import RoutesEnums from "../enums/routes.enums";
import "../App.css";

const pageSize = 6; // Adjust the page size as needed

export default function Blogs() {
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]); // Store all data from all pages
  const [currentPageData, setCurrentPageData] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);

  let navigate = useNavigate();

  useEffect(() => {
    getCollectionLength();
  }, []);

    useEffect(() => {
      fetchData();
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
      setTotalBlogs(collectionLength);
      // Call fetchData after getting the collection length
      fetchData();
    } catch (error) {
      console.error("Error getting collection length:", error);
    }
    finally{
      setLoading(false)
    }
  };

  const fetchData = async () => {
    setLoading(true);
    let q = query(collection(db, "blog"), orderBy("date"), limit(pageSize));

    if (lastDoc) {
      // If lastDoc exists, modify the query to start after the last document
      q = query(
        collection(db, "blog"),
        orderBy("date"),
        startAfter(lastDoc),
        limit(pageSize)
      );
    }

    setLoading(false);

    const querySnapshot = await getDocs(q);

    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // Combine new data with existing data
    //setAllData((prevAllData) => [...prevAllData, ...newData]);
    // Set the data for the current page
    setCurrentPageData(newData);
    // Use a callback to ensure the latest value of lastDoc
    setLastDoc(() => querySnapshot.docs[querySnapshot.docs.length - 1]);
  };

  //   const loadMore = () => {
  //     fetchData();
  //   };

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
                <div className="col-lg-4 col-md-6" key={index}>
                  <div className="card blog blog-primary shadow rounded-3 overflow-hidden border-0">
                    <div className="card-img blog-image position-relative overflow-hidden rounded-0">
                      <div className="position-relative overflow-hidden">
                        <img
                          src={item.image}
                          className="img-fluid img-fixed"
                          style={{
                            objectFit: "contain",
                            aspectRatio: "1/1",
                          }}
                          alt=""
                        />
                        <div className="card-overlay"></div>
                      </div>

                      <div className="blog-tag p-3">
                        {item?.tag?.split(",").map((tag, index) => (
                          <Link
                            key={index}
                            className="badge badge-link bg-primary ms-1"
                            to={`/tags/${tag?.trim()}`} // Assuming you want to link to a specific tag page
                          >
                            {tag?.trim()}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="card-body content p-0">
                      <div className="p-4">
                        <Link
                          to={`/blog-detail/${item.id}`}
                          className="title fw-medium fs-5 text-dark"
                        >
                          {renderDescription(item.title)}
                        </Link>
                        <p dangerouslySetInnerHTML={{__html: renderDescription(item.description)}} className="text-muted mt-2 text-ellipsis">
                        </p>

                        <Link
                          to={`/property-detail/${item.id}`}
                          className="text-dark read-more"
                        >
                          View Property0{" "}
                          <i className="mdi mdi-chevron-right align-middle"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
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
