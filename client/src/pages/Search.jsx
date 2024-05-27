import {
  Button,
  Checkbox,
  Label,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { set } from "mongoose";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";

const Search = () => {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get("searchTerm") || "";
    const type = urlParams.get("type") || "all";
    const parking = urlParams.get("parking") === "true" || false;
    const furnished = urlParams.get("furnished") === "true" || false;
    const offer = urlParams.get("offer") === "true" || false;
    const sort = urlParams.get("sort") || "created_at";
    const order = urlParams.get("order") || "desc";

    if (searchTerm || type || parking || furnished || offer || sort || order) {
      setSidebardata({
        searchTerm,
        type,
        parking,
        furnished,
        offer,
        sort,
        order,
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  console.log(listings);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const url = `/search?${urlParams.toString()}`;
    navigate(url);
  };

  return (
    <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto p-5 my-7 w-full gap-10 lg:gap-14">
      <div className="max-w-xs border-b-2 md:border-r-2 pb-5 md:min-h-screen md:px-3 px-1">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3">
            <p className="font-semibold">Search Term:</p>
            <TextInput
              value={sidebardata.searchTerm}
              onChange={handleChange}
              type="text"
              placeholder="Search..."
              id="searchTerm"
            />
          </div>

          <h3 className=" mt-7 text-[18px] font-semibold mb-3">Type:</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Label htmlFor="all">Rent & Sale</Label>
              <Checkbox
                checked={sidebardata.type === "all"}
                onChange={handleChange}
                id="all"
                className="h-5 w-5"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="rent">Rent</Label>
              <Checkbox
                checked={sidebardata.type === "rent"}
                onChange={handleChange}
                id="rent"
                className="h-5 w-5"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="sale">Sale</Label>
              <Checkbox
                checked={sidebardata.type === "sale"}
                onChange={handleChange}
                id="sale"
                className="h-5 w-5"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="offer">Offer</Label>
              <Checkbox
                onChange={handleChange}
                checked={sidebardata.offer}
                id="offer"
                className="h-5 w-5"
              />
            </div>
          </div>

          <h3 className=" mt-7 text-[18px] font-semibold mb-3">Amenities:</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Label htmlFor="parking">Parking</Label>
              <Checkbox
                onChange={handleChange}
                checked={sidebardata.parking}
                id="parking"
                className="h-5 w-5"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="furnished">Furnished</Label>
              <Checkbox
                onChange={handleChange}
                checked={sidebardata.furnished}
                id="furnished"
                className="h-5 w-5"
              />
            </div>
          </div>

          <div className="max-w-[200px] mt-7">
            <div className="mb-2 block">
              <h3 className=" mt-7 text-[18px] font-semibold mb-3">Sort:</h3>
            </div>
            <Select
              defaultValue={"created_at_desc"}
              onChange={handleChange}
              id="sort_order"
            >
              <option value="regularPrice_desc">Price High to Low</option>
              <option value="regularPrice_asc">Price Low to High</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </Select>
          </div>
          <Button type="submit" className="mt-7 w-full">
            SEARCH
          </Button>
        </form>
      </div>

      <div className="">
        <h1 className="text-2xl font-semibold  mb-6">Listing Results:</h1>

        {loading && (
          <div className="flex items-center justify-center min-h-[40vh]">
            <Spinner />
          </div>
        )}

        {!loading && listings.length === 0 && (
          <p className="text-lg text-slate-700">No listings found.</p>
        )}

        <div className="flex flex-wrap gap-8">
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
