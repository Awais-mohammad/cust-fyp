import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pierTopBlue from "../assect/images/PierTop-blue.png";
import pierTopWhite from "../assect/images/PierTop-white.png";
import { FiSearch, FiUser, CiLogout } from "../assect/icons/vander";
import "./navbar.css";
import "../App.css";
import { logout } from "../pages/auth/auth-functions";
import RoutesEnums from "../enums/routes.enums";

export default function Navbar({ navClass, logolight, menuClass }) {
  const [scroll, setScroll] = useState(false);
  const [isMenu, setisMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const switchMode = () => {
    isSeller ? setIsSeller(false) : setIsSeller(true)
  }

  const iconCheckLoggedIn = () => {
    return localStorage.getItem("accessToken") ? (
      <Link
        onClick={() => {
          logout();
        }}
        to={RoutesEnums.LOGIN}
        className="btn btn-sm btn-icon btn-pills btn-primary"
      >
        <CiLogout className="icons" />
      </Link>
    ) : (
      <Link
        to={RoutesEnums.LOGIN}
        className="btn btn-sm btn-icon btn-pills btn-primary"
      >
        <FiUser className="icons" />
      </Link>
    );
  };

  useEffect(() => {
    activateMenu();
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
    const closeDropdown = () => {
      setModal(false);
    };
    document.addEventListener("mousedown", closeDropdown);
    window.scrollTo(0, 0);
  }, []);

  var mybutton = document.getElementById("back-to-top");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (mybutton != null) {
      if (
        document.body.scrollTop > 500 ||
        document.documentElement.scrollTop > 500
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  }

  // Toggle menu
  const toggleMenu = () => {
    setisMenu(!isMenu);
    if (document.getElementById("navigation")) {
      const anchorArray = Array.from(
        document.getElementById("navigation").getElementsByTagName("a")
      );
      anchorArray.forEach((element) => {
        element.addEventListener("click", (elem) => {
          const target = elem.target.getAttribute("href");
          if (target !== "") {
            if (elem.target.nextElementSibling) {
              var submenu = elem.target.nextElementSibling.nextElementSibling;
              submenu.classList.toggle("open");
            }
          }
        });
      });
    }
  };
  function getClosest(elem, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(
            s
          ),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) { }
          return i > -1;
        };
    }

    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  }

  function activateMenu() {
    var menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems) {
      var matchingMenuItem = null;
      for (var idx = 0; idx < menuItems.length; idx++) {
        if (menuItems[idx].href === window.location.href) {
          matchingMenuItem = menuItems[idx];
        }
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");

        var immediateParent = getClosest(matchingMenuItem, "li");

        if (immediateParent) {
          immediateParent.classList.add("active");
        }

        var parent = getClosest(immediateParent, ".child-menu-item");
        if (parent) {
          parent.classList.add("active");
        }

        var parent = getClosest(parent || immediateParent, ".parent-menu-item");

        if (parent) {
          parent.classList.add("active");

          var parentMenuitem = parent.querySelector(".menu-item");
          if (parentMenuitem) {
            parentMenuitem.classList.add("active");
          }

          var parentOfParent = getClosest(parent, ".parent-parent-menu-item");
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          }
        } else {
          var parentOfParent = getClosest(
            matchingMenuItem,
            ".parent-parent-menu-item"
          );
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          }
        }
      }
    }
  }
  return (
    <>
      <header
        id="topnav"
        className={`${scroll ? "nav-sticky" : ""} ${navClass}`}
      >
        <div className="container">
          <Link className="logo" to="/">
            <span className="logo-light-mode">
              <a className={`${navClass}`}><img style={{ height: "20px", width: "75px" }} src={scroll ? pierTopBlue : pierTopWhite} /></a>
            </span>
          </Link>

          <div className="menu-extras">
            <div className="menu-item">
              <Link
                className={`navbar-toggle ${isMenu ? "open" : ""}`}
                id="isToggle"
                onClick={() => toggleMenu()}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </div>
          </div>


          <div className="wrapper-class">
            <ul className="buy-button list-inline mb-0">
              {localStorage.getItem("accessToken")
                &&
                <li className="list-inline-item ps-1 mb-0">
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn btn-pills btn-primary dropdown-toggle"
                      onClick={switchMode}
                    >
                      {isSeller ? "Switch to buyer" : "Switch to seller"}
                    </button>
                  </div>
                </li>
              }
              <li className="list-inline-item ps-1 mb-0">
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-sm btn-icon btn-pills btn-primary dropdown-toggle"
                    onClick={() => setModal(!modal)}
                  >
                    <FiSearch className="icons" />
                  </button>
                  <div
                    className={`${modal === true ? "show" : ""
                      } dropdown-menu dd-menu dropdown-menu-start bg-white rounded-3 border-0 mt-3 p-0 right-0`}
                    style={{ width: "240px", right: "0" }}
                  >
                    <div className="search-bar">
                      <div id="itemSearch" className="menu-search mb-0">
                        <form
                          role="search"
                          method="get"
                          id="searchItemform"
                          className="searchform"
                        >
                          <input
                            type="text"
                            className="form-control rounded-3 border"
                            name="s"
                            id="searchItem"
                            placeholder="Search..."
                          />
                          <input
                            type="submit"
                            id="searchItemsubmit"
                            value="Search"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-inline-item ps-1 mb-0">
                {iconCheckLoggedIn()}
              </li>
            </ul>
            <div id="navigation" style={{ display: isMenu ? "block" : "none" }}>
              <ul className={menuClass}>
                <li className="has-submenu parent-menu-item">
                  <Link to="/">Services</Link>
                </li>

                <li className="has-submenu parent-parent-menu-item">
                  <Link to="/features">Insight & Research</Link>
                </li>

                <li className="has-submenu parent-parent-menu-item">
                  <Link to="/blogs">Add Properties</Link>
                </li>

                <li className="has-submenu parent-parent-menu-item">
                  <Link to="/aboutus">About Us</Link>
                </li>

                <li>
                  <Link to="/contactus" className="sub-menu-item">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
