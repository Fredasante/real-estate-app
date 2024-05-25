import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import {
  SignOutFailure,
  SignOutStart,
  SignOutSuccess,
} from "../redux/user/userSlice";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(SignOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (res.ok) {
        dispatch(SignOutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      dispatch(SignOutFailure(error.message));
    }
  };

  return (
    <Navbar className="shadow-sm">
      <Logo />

      <form className="hidden md:flex">
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
        />
      </form>
      <div className="flex gap-2 md:order-2">
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar img={currentUser.avatar} alt="profile" rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <>
            <Link to="/sign-in">
              <Button>Sign In</Button>
            </Link>
          </>
        )}
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link
          className="md:hidden lg:flex"
          active={path === "/"}
          as={"div"}
        >
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        {currentUser && (
          <Navbar.Link active={path === "/create-listing"} as={"div"}>
            <Link to="/create-listing">Create Listing</Link>
          </Navbar.Link>
        )}
        {currentUser && (
          <Navbar.Link active={path === "/listings"} as={"div"}>
            <Link to="/listings">Listings</Link>
          </Navbar.Link>
        )}
        <Navbar.Link
          className="md:hidden lg:flex"
          active={path === "/learn"}
          as={"div"}
        >
          <Link to="/learn">Learn More</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
