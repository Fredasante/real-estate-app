import { Link, useLocation } from "react-router-dom";
import logo from "../../public/vite.svg";
import { Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
  const path = useLocation().pathname;

  return (
    <Navbar className="shadow-sm">
      <Link to="/" className="flex gap-2">
        <img src={logo} alt="logo" className="w-7 h-7" />
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Property</span>
          <span className="text-slate-700">Pro</span>
        </h1>
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
        />
      </form>

      <Navbar.Toggle />

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/sign-in">Sign In</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
