import {React,useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import bg3 from "../../assect/images/bg/03.jpg"
import logo from "../../assect/images/logo-icon-80.png"
import pierTopBlue from "../../assect/images/PierTop-blue.png"
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../config'
import { toast } from "react-toastify";
import { toastUtil } from "../../utils/toast.utils";
import Spinner from "../../common/loading-spinner";
export default function AuthLogin(){

    const [loading, setLoading] = useState(false);
/*     useEffect(() => {
        const showSpinner = () => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 1000); 
        };
        showSpinner();
        return () => clearTimeout();
      }, []);  */

    let navigate = useNavigate()
    const [user, setUser] = useState({
        email:"",
        password:""
    })
    let name,value;

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
        e.preventDefault()
        console.log(user)
        setLoading(true)
        signInWithEmailAndPassword(auth, user.email,user.password).then((res)=>{
            console.log(res.user)
            localStorage.setItem('accessToken',JSON.stringify(res.user.accessToken))
            localStorage.setItem('userID',JSON.stringify(res.user.uid))
            localStorage.setItem('userName',res.user.displayName)
        }).catch((err)=>{
            console.log(err)
            toast.error(err?.message, toastUtil)
            setLoading(false)
        }).finally(()=>{
            if (localStorage.getItem('accessToken')) {
                setLoading(false);
                toast.success("Logged In", toastUtil)
                navigate('/');
              }        
        })
    }
    return(
        <section className="bg-home zoom-image d-flex align-items-center">
            {loading && <Spinner/>}
            <div className="bg-overlay image-wrap" style={{backgroundImage:`url(${bg3})`, backgroundPosition:'center'}}></div>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="p-4 bg-white rounded-3 shadow-md mx-auto w-100" style={{maxWidth:'400px'}}>
                            <form onSubmit={postUserData}>
                                <Link to="/"><img src={pierTopBlue} style={{height:"40px", width:"140px"}} className="mb-4 d-block mx-auto" alt=""/></Link>
                                <h5 className="mb-3">Please sign in</h5>
                            
                                <div className="form-floating mb-2">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" value ={user.email} onChange={getUserData} required/>
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" value={user.password} onChange={getUserData} required/>
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                            
                                <div className="d-flex justify-content-between">
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                            <label className="form-check-label text-muted" htmlFor="flexCheckDefault">Remember me</label>
                                        </div>
                                    </div>
                                    <span className="forgot-pass text-muted mb-0"><Link to="/auth-reset-password" className="text-muted">Forgot password ?</Link></span>
                                </div>
                
                                <button className="btn btn-primary w-100" type="submit" onSubmit={postUserData}>Sign in</button>

                                <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted me-2">Don't have an account ?</span> <Link to="/auth-signup" className="text-dark fw-medium">Sign Up</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
       