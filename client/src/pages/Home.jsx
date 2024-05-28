import { Button, Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      const res = await fetch("/api/listing/get?offer=true&limit=4");
      const data = await res.json();
      setOfferListings(data);
      fetchSaleListings();
    };
    const fetchSaleListings = async () => {
      const res = await fetch("/api/listing/get?type=sale&limit=4");
      const data = await res.json();
      setSaleListings(data);
      fetchRentListings();
    };
    const fetchRentListings = async () => {
      const res = await fetch("/api/listing/get?type=rent&limit=4");
      const data = await res.json();
      setRentListings(data);
    };

    fetchOfferListings();
  }, []);

  console.log(offerListings, saleListings, rentListings);

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-col items-center justify-center mt-10 lg:mt-20 xl:min-h-[40vh] text-center">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl">
          Find Your Next{" "}
          <span className="text-slate-500">
            Perfect
            <br />
          </span>{" "}
          place with ease
        </h1>
        <p className="max-w-[500px] mt-10">
          Explore top listings, get personalized recommendations, and make your
          real estate journey seamless. Start your search today!
        </p>
        <div className="flex gap-3 mt-10">
          <Link to="/sign-in">
            <Button color="dark">Get Started Now!</Button>
          </Link>
          <Link>
            <Button color="dark" outline>
              Explore Listings
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <div className="h-56 sm:h-64 xl:h-[400px] 2xl:h-[500px]">
          {offerListings && offerListings.length > 0 && (
            <Carousel
              slide={false}
              className="max-w-screen-xl mx-auto p-5 mt-5"
            >
              {offerListings.map((listing) => (
                <img
                  key={listing._id}
                  src={listing.imageUrls[0]}
                  alt={listing.name}
                />
              ))}
            </Carousel>
          )}
        </div>
      </div>

      <div>
        {offerListings && offerListings.length > 0 && (
          <div className="max-w-screen-xl mx-auto px-5 md:px-10 my-10">
            <h2 className="text-2xl font-semibold text-slate-700 mb-5">
              Recent Offers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {offerListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="max-w-screen-xl mx-auto px-5 md:px-10 my-10">
            <h2 className="text-2xl font-semibold text-slate-700 mb-5">
              Recent Places for Sale
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {saleListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="max-w-screen-xl mx-auto px-5 md:px-10 my-10">
            <h2 className="text-2xl font-semibold text-slate-700 mb-5">
              Recent Places for Rent
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {rentListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
