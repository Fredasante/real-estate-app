import hero from "../assets/about-hero.jpg";

const About = () => {
  return (
    <div className="max-w-screen-xl min-h-[65vh] mx-auto p-5">
      <section className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-10 md:p-5">
        <div>
          <h1 className="text-3xl text-slate-700 font-bold">
            Welcome to Property Pro
          </h1>

          <p className="mt-6">
            At Property Pro, we are dedicated to revolutionizing the real estate
            market by providing a comprehensive and user-friendly platform for
            buying, selling, and renting properties. Our mission is to connect
            buyers, sellers, and renters with their ideal properties through
            innovative technology and exceptional customer service.
          </p>
          <br />

          <h2 className="text-2xl text-slate-700 font-bold">Our Mission</h2>
          <p className="mt-4">
            Our mission is to simplify the real estate process, making it easier
            and more efficient for everyone involved. We aim to provide a
            seamless experience that helps our users find the perfect home or
            investment property quickly and easily. Through our advanced search
            tools, detailed property listings, and professional network of
            verified agents, we strive to be the go-to resource for all your
            real estate needs.
          </p>
          <br />
        </div>

        <div>
          <img
            src={hero}
            alt="couple at home"
            className="rounded-md w-full object-cover max-h-[450px]"
          />
        </div>
      </section>

      <div>
        <h2 className="text-2xl text-slate-700 font-bold text-center mt-7 mb-3">
          Why Choose Us?
        </h2>
        <p>
          <span className="text-slate-700 font-bold">
            Comprehensive Listings:
          </span>{" "}
          We offer a wide range of properties across Ghana, tailored to meet
          diverse needs and budgets. Whether you're looking for a luxurious
          villa, a cozy apartment, or a spacious family home, we have something
          for everyone.
        </p>
        <br />
        <p>
          <span className="text-slate-700 font-bold">
            User Friendly Platform:
          </span>{" "}
          Our platform is designed with the user in mind, ensuring a smooth and
          intuitive browsing experience. With easy-to-use search filters and
          detailed property information, finding your dream property has never
          been easier.
        </p>
        <br />
        <p>
          <span className="text-slate-700 font-bold">Excellent Support: </span>{" "}
          Our customer service team is always ready to assist you with any
          inquiries or issues. We are dedicated to providing prompt and helpful
          support to ensure your experience with Property Pro is positive and
          stress-free. Your satisfaction is our top priority. We listen to your
          needs and feedback to enhance our services and provide a personalized
          experience that exceeds your expectations.
        </p>
      </div>

      <div>
        <h2 className="text-2xl text-slate-700 font-bold text-center mt-7 mb-3">
          Join Us
        </h2>
        <p>
          Explore the world of real estate with Property Pro and discover a
          better way to find your perfect property. Whether you are buying,
          selling, or renting, we are here to make your real estate journey
          smooth and successful. Thank you for choosing Property Pro as your
          trusted real estate partner.
        </p>
        <br />
      </div>
    </div>
  );
};

export default About;
