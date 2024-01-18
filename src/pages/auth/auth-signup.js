import {useState,React} from "react";
import { Link, useNavigate } from "react-router-dom";

import bg3 from "../../assect/images/bg/03.jpg"
import logo from "../../assect/images/logo-icon-80.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config";
import { toast } from "react-toastify";
import { toastUtil } from "../../utils/toast.utils";
import Spinner from "../../common/loading-spinner";
import RoutesEnums from "../../enums/routes.enums"

export default function Signup(){
    const [user, setUser] = useState({
        firstName: "",
        email: "",
        password: "",
      });
      let navigate = useNavigate()
    let name,value;
    const [loading,setLoading] = useState(false)
    const getUserData = (event)=>{
        console.log(event)
        name=event.target.name
        value = event.target.value

        setUser({...user,
            [name]:value
        })
        console.log(user)
    }
    const postUserData =(e)=>{
        setLoading(true)
        e.preventDefault()
        console.log(user)
        createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const userAuth = userCredential.user;
        updateProfile(userAuth, {
          displayName: user.firstName,
        }).then(() => {
          toast.success("Account created", toastUtil)
          setLoading(false)
          console.log("User display name updated successfully");
          navigate(RoutesEnums.LOGIN);
        });
      })
      .catch((error) => {
        toast.error(error.message, toastUtil)
        console.error("Error signing up:", error.message);
      });
    }
    return(
        <>
        {loading && <Spinner/>}
        <section className="bg-home zoom-image d-flex align-items-center">
            <div className="bg-overlay image-wrap" style={{backgroundImage:`url(${bg3})`, backgroundPosition:'center'}}></div>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="p-4 bg-white rounded-3 shadow-md mx-auto w-100" style={{maxWidth:'400px'}}>
                            <form onSubmit={postUserData}> 
                                <Link to="/"><img src={logo} className="mb-4 d-block mx-auto" alt=""/></Link>
                                <h5 className="mb-3">Register your account</h5>
                            
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Harry" name="firstName" value={user.firstName} onChange={getUserData} required/>
                                    <label htmlFor="floatingInput">First Name</label>
                                </div>

                                <div className="form-floating mb-2">
                                    <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" name="email" value={user.email} onChange={getUserData} required/>
                                    <label htmlFor="floatingEmail">Email Address</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" value={user.password} onChange={getUserData} required/>
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                            
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    <label style={{border:"#000 !important" }} className="form-check-label text-muted" htmlFor="flexCheckDefault">I Accept <Link to="#" className="text-primary">Terms And Condition</Link></label>
                                </div>
                
                                <button className="btn btn-primary w-100" type="submit">Register</button>

                                <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted me-2">Already have an account ? </span> <Link to="/auth-login" className="text-dark fw-medium">Sign in</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}