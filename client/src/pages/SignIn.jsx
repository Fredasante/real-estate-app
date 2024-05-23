import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SignInStart,
  SignInFailure,
  SignInSuccess,
} from "../redux/user/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }
    try {
      dispatch(SignInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch(SignInSuccess(data));

      if (!res.ok) {
        dispatch(SignInFailure(data.message));
      }
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      dispatch(SignInFailure(error.message));
    }
  };

  return (
    <section className="min-h-[51vh] mt-20 mb-12">
      <div className="flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto">
        <div className="border border-gray-300 dark:border-gray-700 p-5 rounded-md w-full max-w-[400px] mx-auto">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h1 className="text-center font-bold text-xl mb-2">SIGN IN</h1>
            <div>
              <Label value="Enter Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                className="mt-1"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Enter Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                className="mt-1"
                onChange={handleChange}
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="mt-[2px] ml-1">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="mt-5 flex gap-2 text-sm">
            <span>Don&apos;t have an account?</span>
            <Link to="/sign-up" className="text-teal-600">
              Sign Up
            </Link>
          </div>
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignIn;
