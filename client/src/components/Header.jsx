import { Link, useLocation } from "react-router-dom";
import { Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import Logo from "./Logo";

const Header = () => {
  const path = useLocation().pathname;

  return (
    <Navbar className="shadow-sm">
      <Logo />

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
        <Navbar.Link active={path === "/sign-in"} as={"div"}>
          <Link to="/sign-in">Sign In</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
