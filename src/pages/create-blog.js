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
  let navigate = useNavigate ()
  const [formData, setFormData] = useState({
    tag: "",
    title: "",
    description:"",
    author:"",
    date: "",
    image: "",
  });
  const [percent, setPercent] = useState(0);
  const [showPercentBar, setShowPercentBar]= useState(false)
  const [loading, setLoading] = useState(false);


  const handleUpload = () => {
    setLoading(true)
    return new Promise((resolve, reject) => {
        if (!formData.image) {
            alert("Please choose a file first!");
            reject("No file selected");
            return;
        }

        const storageRef = ref(storage, `/blogImages/${formData.imageName}`);
        const uploadTask = uploadBytesResumable(storageRef, formData.image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setShowPercentBar(true)
                setPercent(percent);
            },
            (err) => {
                console.error(err);
                setLoading(false)
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
};
const [descVal, setDescVal] = useState("")
const handleChange = (e) => {
  const { name, value, files } = e?.target;

  if (name === "image" && files.length > 0) {
    const imageName = files[0]?.name;

    setFormData((prevData) => ({
      ...prevData,
      imageName,  
      [name]: files[0],
    }));
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};

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
      const imageUrl = await handleUpload();
      const docRef = await addDoc(collection(db, "property"), {
          tag: formData.tag,
          title: formData.title,
          description: descVal,
          author:localStorage.getItem('userName'),
          date: formData.date,
          image: imageUrl,
      });

      console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    setLoading(false)
    toast.error(error.message, toastUtil)
      console.error("Error adding document: ", error);
  }
  finally{
    toast.success("Property Added!!!", toastUtil)
    setLoading(false)
    setFormData(null)
    navigate(RoutesEnums.BLOGS)
  }
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
                        {/* <textarea
                          name="description"
                          id="blog-description"
                          rows="4"
                          className="form-control"
                          placeholder="Description :"
                          onChange={handleChange}
                          value={formData.description}
                          required
                        ></textarea> */}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Upload Image</label>
                        <input
                          name="image"
                          id="blog-image"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          className="form-control"
                          onChange={handleChange}
                          defaultValue={formData.image}
                          required
                        />
                        {showPercentBar && (
                          <span>
                            <Progress percent={percent} size="small" />
                          </span>
                        )}
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
        </div>

        {/* <div className="container-fluid mt-100 mt-60">
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="card map border-0">
                            <div className="card-body p-0">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" style={{border:"0" }} title="Townter" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
      </section>
      <Footer />
    </>
  );
}
