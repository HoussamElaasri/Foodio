import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Navb() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header className={`nav-wrap ${open ? "open" : ""}`} ref={wrapRef}>
      <div className="navbar">
        <a as={Link} className="brand" to={"/"}>
        <img height="60px" src="logo.png" alt="" />
        </a>

        <nav className="nav">
          <Link to={"/"}>Home</Link>
          <Link to={"/categories"}>Categories</Link>
          <Link to={"/recipes"}>Recipes</Link>
          <Link to={"/saved"}>Saved Recipes</Link>
          <Link to={"/chatbot"}>Chatbot</Link>
        </nav>


        <button
          className="burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span></span>
        </button>
      </div>

      <div className="mobile-panel">
        <div className="mobile-links">
          <Link to={"/"} onClick={() => setOpen(false)}>Home</Link>
          <Link to={"/categories"} onClick={() => setOpen(false)}>Categories</Link>
          <Link to={"/recipes"} onClick={() => setOpen(false)}>Recipes</Link>
          <Link to={"/saved"} onClick={() => setOpen(false)}>Saved Recipes</Link>
        </div>

      </div>
    </header>
  );
}