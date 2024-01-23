import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import Navbar from "../../components/navbar";
import ProprtySlider from "../../components/propertySlider";
import { propertyData } from "../../data/data";
import Lightbox from 'react-18-image-lightbox'
import "../../../node_modules/react-18-image-lightbox/style.css"
import Footer from "../../components/footer";
import { db } from "../../config";
import Spinner from "../../common/loading-spinner";

export default function PropertyDetails() {
    const [property, setProperty] = useState({});
    const [coordinates, setCoordinates] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const params = useParams()
    const id = params.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = doc(db, "property", id);
                const res = await getDoc(q);
                setProperty(res.data());

                const address = res.data().address;
                const coordinates = await getCoordinatesFromAddress(address);
                setCoordinates(coordinates);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchData();
        }

        return () => {
            // Cleanup if needed
        };
    }, [params.id]);

    const getCoordinatesFromAddress = async (address) => {
        try {
            const apiKey = "AIzaSyC38c0FOMkP_9H60OrKJ1Yf_gBqhaGSlL8";
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
            const data = await response.json();

            if (data.status === "OK" && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                return { lat: location.lat, lng: location.lng };
            } else {
                console.error("Error getting coordinates from address:", data.status);
                return null;
            }
        } catch (error) {
            console.error("Error getting coordinates from address:", error);
            return null;
        }
    };

    const data = propertyData.find((item) => item.id === parseInt(id))
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [open, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const images = property?.images

    const handleMovePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + images.length - 1) % images.length);
    };

    const handleMoveNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setIsOpen(true);
    };

    const handleFeedback = async (property) => {
        const prop = await doc(db, "property", id);
        await updateDoc(prop, {
            feedback: feedback,
        })
    }

    if (loading || !images || images.length === 0) {
        return <Spinner />
    }

    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = property?.description;
    let description = tempDiv.textContent || tempDiv.innerText;

    const currentImage = images[currentImageIndex];
    return (
        <>
            <Navbar navClass="defaultscroll sticky" menuClass="navigation-menu nav-left" />
            <section className="section mt-5 pt-4">
                <div className="container-fluid mt-2">
                    <div className="row g-2">
                        <div className="col-md-6">
                            <Link to="#" onClick={() => handleImageClick(0)} className="lightbox" title="">
                                <img src={property?.images[0]} className="img-fluid rounded-3 shadow" alt="" />
                            </Link>
                        </div>

                        <div className="col-md-6">
                            <div className="row g-2">
                                <div className="col-6">
                                    <Link to="#" onClick={() => handleImageClick(1)} className="lightbox" title="">
                                        <img src={images[1]} className="img-fluid rounded-3 shadow" alt="" />
                                    </Link>
                                </div>

                                <div className="col-6">
                                    <Link to="#" onClick={() => handleImageClick(2)} className="lightbox" title="">
                                        <img src={images[2]} className="img-fluid rounded-3 shadow" alt="" />
                                    </Link>
                                </div>

                                <div className="col-6">
                                    <Link to="#" onClick={() => handleImageClick(3)} className="lightbox" title="">
                                        <img src={images[3]} className="img-fluid rounded-3 shadow" alt="" />
                                    </Link>
                                </div>

                                <div className="col-6">
                                    <Link to="#" onClick={() => handleImageClick(4)} className="lightbox" title="">
                                        <img src={images[4]} className="img-fluid rounded-3 shadow" alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-100 mt-60">
                    <div className="row g-4">
                        <div className="col-lg-8 col-md-7 col-12">
                            <div className="section-title">
                                <h4 className="title mb-0">{property?.title ? property?.title : "10765 Hillshire Ave, Baton Rouge, LA 70810, USA"}</h4>

                                <ul className="list-unstyled mb-0 py-3">
                                    <li className="list-inline-item">
                                        <span className="d-flex align-items-center me-4">
                                            <i className="mdi mdi-arrow-expand-all fs-4 me-2 text-primary"></i>
                                            <span className="text-muted fs-5">{property?.area} sqft</span>
                                        </span>
                                    </li>

                                    <li className="list-inline-item">
                                        <span className="d-flex align-items-center me-4">
                                            <i className="mdi mdi-bed fs-4 me-2 text-primary"></i>
                                            <span className="text-muted fs-5">{property?.beds} Beds</span>
                                        </span>
                                    </li>

                                    <li className="list-inline-item">
                                        <span className="d-flex align-items-center">
                                            <i className="mdi mdi-shower fs-4 me-2 text-primary"></i>
                                            <span className="text-muted fs-5">{property?.baths} Baths</span>
                                        </span>
                                    </li>
                                </ul>

                                <p className="text-muted">{description ? description : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt"}</p>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center justify-content-between">

                                        <label className="form-label fs-5 text-muted">
                                            Feedback & Testimonials
                                        </label>
                                        <button onClick={() => {
                                            handleFeedback(property)
                                        }} className="badge bg-primary">Submit</button>
                                    </div>

                                    <textarea
                                        name="comments"
                                        id="comments"
                                        rows="4"
                                        className="form-control text-muted"
                                        placeholder="Give Feedback"
                                        onChange={(e) => {
                                            setFeedback(e.target.value)
                                          }}
                                    ></textarea>
                                </div>
                                {coordinates && <div className="card map border-0">
                                    <div className="card-body p-0">
                                        <iframe
                                            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d${coordinates?.lng}!3d${coordinates?.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin`}
                                            className="rounded-3"
                                            style={{ border: '0' }}
                                            title="Townter"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>}
                                {!coordinates && <div className="fs-5">
                                    <span className="bg-primary p-2 rounded text-light">Address : </span>
                                    <p className="d-inline ps-2 text-muted">{property?.address}</p>
                                </div>
                                }
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-5 col-12">
                            <div className="rounded-3 shadow bg-white sticky-bar p-4">
                                <h5 className="mb-3">Price:</h5>

                                <div className="d-flex align-items-center justify-content-between">
                                    <h5 className="mb-0">{property?.soldPrice ? property?.soldPrice : "14745"}</h5>
                                    <button className="badge bg-primary">{property?.isSold ? "Sold" : "For Sale"}</button>
                                </div>

                                <div className="">
                                    <div className="d-flex align-items-center justify-content-between mt-2">
                                        <span className="small text-muted">Days on Towntor</span>
                                        <span className="small">124 Days</span>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between mt-2">
                                        <span className="small text-muted">Price per sq ft</span>
                                        <span className="small">{Math.floor(property?.soldPrice / property?.area)}</span>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between mt-2">
                                        <span className="small text-muted">Monthly Payment (estimate)</span>
                                        <span className="small">1497/Monthly</span>
                                    </div>
                                </div>

                                <div className="d-flex mt-3">
                                    <Link to="#" className="btn btn-primary w-100 me-2">Message</Link>
                                    <Link to="#" className="btn btn-primary w-100">+923457789098</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-100 mt-60">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="section-title text-center mb-4 pb-2">
                                <h4 className="title mb-3">Related Properties</h4>
                                <p className="text-muted para-desc mb-0 mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                            </div>
                        </div>
                    </div>

                    <ProprtySlider />
                </div>
            </section>
            <Footer />
            {open && (
                <Lightbox
                    mainSrc={currentImage}
                    prevSrc={images[(currentImageIndex + images.length - 1) % images.length]}
                    nextSrc={images[(currentImageIndex + 1) % images.length]}

                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={handleMovePrev}
                    onMoveNextRequest={handleMoveNext}
                />
            )}
        </>
    )
}