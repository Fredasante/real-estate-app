import { Card } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Learn = () => {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-2 text-3xl leading-10 font-extrabold tracking-tight text-slate-700 sm:text-4xl">
            Welcome to Property Pro
          </p>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 mx-auto">
            Follow this guide to get started and make the most out of our
            platform.
          </p>
        </div>

        <div className="mt-12 space-y-16">
          <section>
            <h3 className="text-2xl font-bold text-slate-700">
              1. Sign Up or Log In
            </h3>
            <div className="mt-4 text-lg text-slate-700">
              <p>
                <strong>Create an Account:</strong>
              </p>
              <ul className="list-disc list-inside mt-2 text-base">
                <li>
                  Visit our{" "}
                  <Link
                    to="/sign-up"
                    className="text-teal-500 font-semibold hover:underline"
                  >
                    Sign Up
                  </Link>{" "}
                  page.
                </li>
                <li>
                  Fill in your personal details, such as your name, email, and
                  password.
                </li>
                <li>Your account is now successfully created.</li>
              </ul>
              <p className="mt-4">
                <strong>Log In:</strong>
              </p>
              <ul className="list-disc list-inside mt-2 text-base">
                <li>
                  Go to the{" "}
                  <Link
                    to="/sign-in"
                    className="text-teal-500 font-semibold hover:underline"
                  >
                    Sign In
                  </Link>{" "}
                  page if you already have an account.
                </li>
                <li>
                  Enter your email and password to access your account or Sign
                  In with Google.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-700">
              2. Complete Your Profile
            </h3>
            <div className="mt-4 text-lg text-slate-700 ">
              <p>
                <strong>Profile Information:</strong>
              </p>
              <ul className="list-disc list-inside mt-2 text-base">
                <li>Navigate to your profile settings once logged in.</li>
                <li>
                  Fill in additional information such as your phone number and
                  address.
                </li>
                <li>
                  Upload a profile picture to make your account more personable.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-700">
              3. Explore Listings
            </h3>
            <div className="mt-4 text-lg text-slate-700">
              <p>
                <strong>Browse Properties:</strong>
              </p>
              <ul className="list-disc list-inside mt-2 text-base">
                <li>
                  Use the search bar on the homepage to look for properties.
                </li>
                <li>
                  Apply filters such as property type, amenities, sort and more.
                </li>
                <li>
                  View property details, including photos, descriptions,
                  amenities, and contact information.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-700">
              4. Contact Sellers or Agents
            </h3>
            <div className="mt-4 text-lg text-slate-700">
              <p>
                <strong>Inquire About a Property:</strong>
              </p>
              <ul className="list-disc list-inside mt-2 text-base">
                <li>Click on a listing to view its details.</li>
                <li>
                  Use the contact form to reach out to the seller or agent.
                </li>
                <li>
                  Schedule viewings and ask any questions you have about the
                  property.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-700">
              5. List Your Property
            </h3>
            <div className="mt-4 text-lg text-slate-700">
              <p>
                <strong>Create a Listing:</strong>
              </p>
              <ul className="list-disc list-inside mt-2 text-base">
                <li>Go to the "Listings" section after authentication.</li>
                <li>
                  Fill in the property details, including address, price,
                  description, and photos.
                </li>
                <li>
                  Review your listing and publish it to make it live on the
                  platform.
                </li>
              </ul>
              <p className="mt-4">
                <strong>Manage Your Listings:</strong>
              </p>
              <ul className="list-disc list-inside mt-2 text-base">
                <li>View and edit your active listings from your dashboard.</li>
                <li>
                  Track inquiries and manage communications with potential
                  buyers or renters.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-700">
              6. Get Support
            </h3>
            <Card className="max-w-sm mt-6">
              <h5 className="font-bold tracking-tight text-slate-700">
                alfredapenteng6996@gmail.com
              </h5>
              <p className="font-normal text-gray-700">
                Phone: +233 55 840 7334
              </p>
              <p className="font-normal text-gray-700">
                Address: 6 Asuna Street, Accra - Ghana
              </p>
            </Card>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-700">
              Tips for Success
            </h3>
            <div className="mt-4 text-lg text-slate-700">
              <ul className="list-disc list-inside mt-2 text-base">
                <li className="mb-1">
                  <strong>Regular Updates:</strong> Keep your profile and
                  listings up-to-date to attract more inquiries.
                </li>
                <li className="mb-1">
                  <strong>High-Quality Photos:</strong> Use clear and
                  high-resolution photos for your listings to make them more
                  appealing.
                </li>
                <li>
                  <strong>Detailed Descriptions:</strong> Provide thorough and
                  accurate descriptions of your properties to give potential
                  buyers or renters all the information they need.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Learn;
