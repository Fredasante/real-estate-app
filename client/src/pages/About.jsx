import hero from "../assets/about-hero.jpg";

const About = () => {
  return (
    <div className="max-w-screen-xl min-h-[65vh] mx-auto p-5 flex">
      <div className="flex justify-center items-center">
        <section className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-10 md:p-5">
          <div>
            <h1 className="text-3xl text-slate-700 font-bold">About Us</h1>

            <p className="mt-6">
              At Property Pro, our mission is to simplify the real estate
              process, providing a seamless and efficient platform for buying,
              selling, and renting properties. We strive to connect buyers,
              sellers, and renters with their ideal properties through
              innovative technology and dedicated service.
            </p>
            <br />

            <p>
              <span className="text-slate-700 font-bold">
                Comprehensive Listings:
              </span>{" "}
              Access a wide range of properties across Ghana, tailored to meet
              diverse needs and budgets.
            </p>
            <br />
            <p>
              <span className="text-slate-700 font-bold">
                User Friendly Platform:
              </span>{" "}
              Enjoy a seamless browsing experience with our intuitive and
              easy-to-use interface.
            </p>
            <br />
            <p>
              <span className="text-slate-700 font-bold">
                Excellent Support:{" "}
              </span>{" "}
              Our customer service team is always ready to assist you with any
              inquiries or issues.
            </p>
          </div>

          <div>
            <img
              src={hero}
              alt="couple at home"
              className="rounded-md w-full object-cover max-h-[450px]"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
