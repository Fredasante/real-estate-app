import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      setErrorMessage(null);

      if (!res.ok) {
        return setErrorMessage(data.message || "Something went wrong");
      }
      navigate("/sign-in");
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[51vh] mt-20 mb-12">
      <div className="flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto">
        <div className="border border-gray-300 dark:border-gray-700 p-5 rounded-md w-full max-w-[400px] mx-auto">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h1 className="text-center font-bold text-xl mb-2">SIGN UP</h1>
            <div>
              <Label value="Enter Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                className="mt-1"
                onChange={handleChange}
              />
            </div>
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
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-teal-600">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignUp;
