import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import bg4 from "../assect/images/bg/04.jpg";
import Footer from "../components/footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Progress } from 'antd';
import "../App.css";
import { db } from "../config";
import { storage } from "../config";
import { collection, addDoc } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import Spinner from "../common/loading-spinner";
import { toast } from "react-toastify";
import { toastUtil } from "../utils/toast.utils";
import RoutesEnums from "../enums/routes.enums";

export default function CreateBlog() {
  let navigate = useNavigate()
  const [formData, setFormData] = useState({
    tag: "",
    title: "",
    description: "",
    author: "",
    date: "",
    image: "",
    address: "",
  });
  const [percent, setPercent] = useState(0);
  const [showPercentBar, setShowPercentBar] = useState(false)
  const [loading, setLoading] = useState(false);
  const [imageArray, setImageArray] = useState([]);


  const handleChange = (e) => {
    const { name, files } = e.target;

    if (name === "images" && files.length > 0) {
      const images = Array.from(files);
      setImageArray((prevImages) => [...prevImages, ...images]);
    } else {
      // Handle other input fields as before
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.value,
      }));
    }
  };


  // const handleChange = (e) => {
  //   const { name, value, files } = e?.target;

  //   if (name === "image" && files.length > 0) {
  //     const imageName = files[0]?.name;

  //     setFormData((prevData) => ({
  //       ...prevData,
  //       imageName,
  //       [name]: files[0],
  //     }));
  //   } else {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   }
  // };

  const handleUpload = () => {
    setLoading(true);

    return Promise.all(
      imageArray.map((image) => {
        const imageName = image.name;
        const storageRef = ref(storage, `/blogImages/${imageName}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setShowPercentBar(true);
              setPercent(percent);
            },
            (err) => {
              console.error(err);
              setLoading(false);
              reject(err);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                  console.log(url);
                  resolve(url);
                })
                .catch((err) => {
                  console.error(err);
                  reject(err);
                });
            }
          );
        });
      })
    );
  };


  // const handleUpload = () => {
  //   setLoading(true)
  //   return new Promise((resolve, reject) => {
  //     if (!formData.image) {
  //       alert("Please choose a file first!");
  //       reject("No file selected");
  //       return;
  //     }

  //     const storageRef = ref(storage, `/blogImages/${formData.imageName}`);
  //     const uploadTask = uploadBytesResumable(storageRef, formData.image);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const percent = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //         setShowPercentBar(true)
  //         setPercent(percent);
  //       },
  //       (err) => {
  //         console.error(err);
  //         setLoading(false)
  //         reject(err);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref)
  //           .then((url) => {
  //             console.log(url);
  //             resolve(url);
  //           })
  //           .catch((err) => {
  //             console.error(err);
  //             reject(err);
  //           });
  //       }
  //     );
  //   });
  // };


  const [descVal, setDescVal] = useState("")


  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      setFormData({
        ...formData,
        tag: formData.tag.trim() + ",",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrls = await handleUpload();
      const randomPercentage = Math.random() * 60 - 30;
      let predictedPrice = formData?.askedPrice * (1 + (randomPercentage / 100));
      predictedPrice = Math.round(predictedPrice)

      const docRef = await addDoc(collection(db, "property"), {
        tag: formData.tag,
        beds: formData.beds,
        baths: formData.baths,
        area: formData.area,
        askedPrice: formData.askedPrice,
        address: formData.address,
        predictedPrice: predictedPrice,
        title: formData.title,
        description: descVal,
        author: localStorage.getItem('userName'),
        date: formData.date,
        isSold: false,
        images: imageUrls,

      });

    } catch (error) {
      setLoading(false);
      toast.error(error.message, toastUtil);
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
      setFormData(null);
      navigate(RoutesEnums.BLOGS);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const imageUrl = await handleUpload();
  //     const docRef = await addDoc(collection(db, "property"), {
  //       tag: formData.tag,
  //       beds: formData.beds,
  //       baths: formData.baths,
  //       area: formData.area,
  //       askedPrice: formData.askedPrice,
  //       // soldPrice: formData.soldPrice,
  //       title: formData.title,
  //       description: descVal,
  //       author: localStorage.getItem('userName'),
  //       date: formData.date,
  //       image: imageUrl,
  //       isSold: false,
  //     });

  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (error) {
  //     setLoading(false)
  //     toast.error(error.message, toastUtil)
  //     console.error("Error adding document: ", error);
  //   }
  //   finally {
  //     toast.success("Property Added!!!", toastUtil)
  //     setLoading(false)
  //     setFormData(null)
  //     navigate(RoutesEnums.BLOGS)
  //   }
  // };

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
        style={{ backgroundImage: `url(${bg4})` }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container end-section">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  Add Property
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
                  Add Property
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
      <section className="section pb-0">
        <div className="container end-section">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="p-4 rounded-3 shadow">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">
                          Tags <span className="text-danger">*</span>
                        </label>
                        <input
                          name="tag"
                          id="blog-tag"
                          type="text"
                          className="form-control"
                          placeholder="Tag :"
                          onChange={handleChange}
                          onKeyDown={handleKeyPress}
                          value={formData.tag}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-9">
                      <div className="mb-3">
                        <label className="form-label">
                          Title <span className="text-danger">*</span>
                        </label>
                        <input
                          name="title"
                          id="blog-title"
                          type="text"
                          className="form-control"
                          placeholder="Title :"
                          onChange={handleChange}
                          value={formData.title}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Date</label>
                        <input
                          name="date"
                          id="blog-date"
                          type="date"
                          className="form-control"
                          placeholder="Date :"
                          onChange={handleChange}
                          value={formData.date}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label className="form-label">
                          Beds <span className="text-danger">*</span>
                        </label>
                        <input
                          name="beds"
                          id="blog-beds"
                          type="number"
                          className="form-control"
                          placeholder="Number of Beds :"
                          onChange={handleChange}
                          onKeyDown={handleKeyPress}
                          value={formData.beds}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label className="form-label">
                          Baths <span className="text-danger">*</span>
                        </label>
                        <input
                          name="baths"
                          id="blog-baths"
                          type="number"
                          className="form-control"
                          placeholder="Number of baths :"
                          onChange={handleChange}
                          value={formData.baths}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label className="form-label">
                          Area <span className="text-danger">*</span>
                        </label>
                        <input
                          name="area"
                          id="blog-area"
                          type="number"
                          className="form-control"
                          placeholder="Area in sq feet :"
                          onChange={handleChange}
                          value={formData.area}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">
                          Description <span className="text-danger">*</span>
                        </label>
                        <ReactQuill
                          className="h-[500px]"
                          theme="snow"
                          value={descVal}
                          onChange={setDescVal}
                          required
                        />
                      </div>
                    </div>

                    <div div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Asked Price <span className="text-danger">*</span>
                        </label>
                        <input
                          name="askedPrice"
                          id="blog-askedPrice"
                          type="number"
                          className="form-control"
                          placeholder="Asked Price :"
                          onChange={handleChange}
                          value={formData.askedPrice}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      {/* <div className="mb-3">
                        <label className="form-label">
                          Sold Price <span className="text-danger">*</span>
                        </label>
                        <input
                          name="soldPrice"
                          id="blog-soldPrice"
                          type="number"
                          className="form-control"
                          placeholder="Sold Price :"
                          onChange={handleChange}
                          value={formData.soldPrice}
                          required
                        />
                      </div> */}
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Upload Image</label>
                        <input
                          name="images"
                          id="blog-images"
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          className="form-control"
                          onChange={handleChange}
                          multiple
                          required
                        />
                        {showPercentBar && (
                          <span>
                            <Progress percent={percent} size="small" />
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">
                          Address <span className="text-danger">*</span>
                        </label>
                        <input
                          name="address"
                          id="blog-address"
                          type="text"
                          className="form-control"
                          placeholder="Address :"
                          onChange={handleChange}
                          value={formData.address}
                          required
                        />
                      </div>
                    </div>


                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          type="submit"
                          id="blog-submit"
                          name="blog-submit"
                          className="btn btn-primary"
                        >
                          Add Property
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div >
      </section >
      <Footer />
    </>
  );
}
