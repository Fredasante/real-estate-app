import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const SignUp = () => {
  return (
    <section className="min-h-[51vh] mt-20 mb-12">
      <div className="flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto">
        <div className="border border-gray-300 dark:border-gray-700 p-5 rounded-md w-full max-w-[400px] mx-auto">
          <form className="flex flex-col gap-4">
            <h1 className="text-center font-bold text-xl mb-2">SIGN UP</h1>
            <div>
              <Label value="Enter Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                className="mt-1"
              />
            </div>
            <div>
              <Label value="Enter Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                className="mt-1"
              />
            </div>
            <div>
              <Label value="Enter Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                className="mt-1"
              />
            </div>

            <Button type="submit">Sign Up</Button>
          </form>
          <div className="mt-5 flex gap-2 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-teal-600">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
