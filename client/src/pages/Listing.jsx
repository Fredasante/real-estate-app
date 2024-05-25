import { Carousel, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Listing = () => {
  const { listingId } = useParams();
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(false);

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

  console.log(listing);
  return (
    <main>
      {loading && (
        <div className="flex items-center justify-center min-h-[30vh]">
          <Spinner />
        </div>
      )}
      <div className="h-56 sm:h-64 xl:h-96 2xl:h-[500px">
        <Carousel slide={false}>
          {listing.imageUrls &&
            listing.imageUrls.map((item) => (
              <img key={item} src={item} alt="Listing" />
            ))}
        </Carousel>
      </div>
    </main>
  );
};

export default Listing;
