import { Link } from "react-router-dom";
import logo from "/vite.svg";

const Logo = () => {
  return (
    <Link to="/" className="flex gap-2">
      <img src={logo} alt="logo" className="w-6 h-6 sm:w-7 sm:h-7" />
      <h1 className="font-bold sm:text-xl flex flex-wrap">
        <span className="text-slate-500">Property</span>
        <span className="text-slate-700">Pro</span>
      </h1>
    </Link>
  );
};

export default Logo;
