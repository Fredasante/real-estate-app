import { Button, Card, Carousel, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import ContactLandlord from "../components/ContactLandlord";

const Listing = () => {
  const { listingId } = useParams();
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();

        if (res.ok) {
          setListing(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  return (
    <main className="my-7">
      {loading && (
        <div className="flex items-center justify-center min-h-[40vh]">
          <Spinner />
        </div>
      )}
      {listing && (
        <div className="p-5">
          <div className="h-56 sm:h-64 xl:h-[400px] 2xl:h-[500px]">
            <Carousel className="max-w-screen-lg mx-auto" slide={false}>
              {listing.imageUrls &&
                listing.imageUrls.map((item) => (
                  <img key={item} src={item} alt="Listing" />
                ))}
            </Carousel>
          </div>
          <div className="max-w-screen-lg  mx-auto mt-10">
            <Card className="max-w-md my-5">
              <div className="flex items-baseline justify-between">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                  {listing.name}
                </h5>
                <div className="flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-xl font-semibold">GH₵</span>
                  <span className="text-3xl font-bold tracking-tight">
                    {listing.offer
                      ? listing.discountPrice
                        ? listing.discountPrice.toLocaleString("en-US")
                        : 0
                      : listing.regularPrice
                      ? listing.regularPrice.toLocaleString("en-US")
                      : 0}
                  </span>
                  {listing.type === "rent" && (
                    <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  )}
                </div>
              </div>

              <p className="my-3 flex items-center gap-1 text-slate-600 text-sm">
                <FaMapMarkerAlt className="text-green-700" />
                {listing.address}
              </p>
              <div className="flex gap-4">
                <p className="bg-red-800 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing.offer && (
                  <p className="bg-green-800 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    GH₵{+listing.regularPrice - +listing.discountPrice} OFF
                  </p>
                )}
              </div>
            </Card>

            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>

            <ul className="mt-5 text-slate-800 font-semibold text-sm flex flex-wrap items-center gap-5 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && !contact && listing.userRef === currentUser._id && (
              <Button
                onClick={() => setContact(true)}
                className="w-full my-7"
                color="dark"
              >
                CONTACT LANDLORD
              </Button>
            )}
            {contact && <ContactLandlord listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
