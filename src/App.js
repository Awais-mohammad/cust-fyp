import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Index from "./pages/index";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assect/scss/style.scss";
import "./assect/css/materialdesignicons.min.css";
import Footer from "./components/footer";
import ScrollTop from "./components/scrollTop";
import IndexTwo from "./pages/index/index-two";
import IndexThree from "./pages/index/index-three";
import IndexFour from "./pages/index/index-four";
import IndexFive from "./pages/index/index-five";
import IndexSix from "./pages/index/index-six";
import IndexSeven from "./pages/index/index-seven";
import Buy from "./pages/buy";
import Sell from "./pages/sell";
import Grid from "./pages/listing/grid";
import GridSidebar from "./pages/listing/grid-sidebar";
import List from "./pages/listing/list";
import ListSidebar from "./pages/listing/list-sidebar";
import PropertyDetails from "./pages/listing/property-detail";
import PropertyDetailsTwo from "./pages/listing/property-detail-two";
import AboutUs from "./pages/aboutus";
import Features from "./pages/features";
import Pricing from "./pages/pricing";
import Faqs from "./pages/faqs";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import Blogs from "./pages/blogs";
import BlogSidebar from "./pages/blog-sidebar";
import BlogDetail from "./pages/blog-detail";
import ContactUs from "./pages/contactus";
import AuthLogin from "./pages/auth/auth-login";
import ResetPassword from "./pages/auth/auth-re-password";
import Signup from "./pages/auth/auth-signup";
import Comingsoon from "./pages/Special/comingsoon";
import Maintenance from "./pages/Special/maintenance";
import Error from "./pages/Special/error";
import CreateBlog from "./pages/create-blog";
import RoutesEnums from "./enums/routes.enums";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const CHECK_LOGGED_IN = (props) => {
    const { children } = props;
    const authToken = localStorage.getItem('accessToken');

    useEffect(() => {
      if (!authToken) {
        navigate(RoutesEnums.LOGIN);
      }
    }, [authToken]);

    return <>{children}</>;
  };

  const GUARD_ROUTE = (props) => {
    const { children } = props;
    const user= ""
/*     if (
      user &&
      (user.type === props.role || props.role === KanzRoles.ALL) &&
      (user.status === ApplicationStatus.OPENED ||
        user.status === ApplicationStatus.REOPENED)
    ) */
      return <>{children}</>;
    return ;
  };
  
  return (
    <>
      <Routes>
        <Route path= {RoutesEnums.HOME} element={<IndexThree />} />
        <Route path={RoutesEnums.IndexTwo} element={<IndexTwo />} />
        <Route path={RoutesEnums.INDEX_THREE} element={<IndexThree />} />
        <Route path={RoutesEnums.INDEX_FOUR} element={<IndexFour />} />
        <Route path={RoutesEnums.INDEX_FIVE} element={<IndexFive />} />
        <Route path={RoutesEnums.INDEX_SIX} element={<IndexSix />} />
        <Route path={RoutesEnums.INDEX_SEVEN} element={<IndexSeven />} />
        <Route path={RoutesEnums.BUY} element={<Buy />} />
        <Route path={RoutesEnums.SELL} element={<Sell />} />
        <Route path={RoutesEnums.GRID} element={<Grid />} />
        <Route path={RoutesEnums.GRID_SIDEBAR} element={<GridSidebar />} />
        <Route path={RoutesEnums.LIST} element={<List />} />
        <Route path={RoutesEnums.LIST_SIDEBAR} element={<ListSidebar />} />
        <Route path={RoutesEnums.PROPERTY_DETAIL} element={<PropertyDetails />} />
        <Route path={RoutesEnums.PROPERTY_DETAIL_ID} element={<PropertyDetails />} />
        <Route path={RoutesEnums.PROPERTY_DETAIL_TWO} element={<PropertyDetailsTwo />} />
        <Route path={RoutesEnums.ABOUT_US} element={<AboutUs />} />
        <Route path={RoutesEnums.FEATURES} element={<Features />} />
        <Route path={RoutesEnums.PRICING} element={<Pricing />} />
        <Route path={RoutesEnums.FAQS} element={<Faqs />} />
        <Route path={RoutesEnums.TERMS} element={<Terms />} />
        <Route path={RoutesEnums.PRIVACY} element={<Privacy />} />
        <Route path={RoutesEnums.BLOGS} element={<Blogs />} />
        <Route path={RoutesEnums.BLOG_SIDEBAR} element={<BlogSidebar />} />
        <Route path={RoutesEnums.BLOG} element={<BlogDetail />} />
        <Route path={RoutesEnums.BLOG_DETAIL} element={<BlogDetail />} />
        <Route path={RoutesEnums.CONTACT_US} element={<ContactUs />} />
        <Route path={RoutesEnums.LOGIN} element={<AuthLogin />} />
        <Route path={RoutesEnums.SIGN_UP} element={<Signup />} />
        <Route path={RoutesEnums.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={RoutesEnums.CREATE_BLOG} element={<CHECK_LOGGED_IN><CreateBlog /></CHECK_LOGGED_IN>} />
        <Route path={RoutesEnums.COMING_SOON} element={<Comingsoon />} />
        <Route path={RoutesEnums.MAINTENANCE} element={<Maintenance />} />
        <Route path={RoutesEnums.ERROR} element={<Error />} />
      </Routes>
      <ScrollTop />
    </>
  );
}

export default App;
