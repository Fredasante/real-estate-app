import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto p-5 my-7 w-full gap-10 lg:gap-14">
      <div className="max-w-xs border-b-2 md:border-r-2 pb-5 md:min-h-screen md:px-3 px-1">
        <form>
          <div className="flex items-center gap-3">
            <p className="font-semibold">Search Term:</p>
            <TextInput type="text" placeholder="Search..." id="searchTerm" />
          </div>

          <h3 className=" mt-7 text-[18px] font-semibold mb-3">Type:</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Label htmlFor="all">Rent & Sale</Label>
              <Checkbox id="all" className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="rent">Rent</Label>
              <Checkbox id="rent" className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="sale">Sale</Label>
              <Checkbox id="sale" className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="offer">Offer</Label>
              <Checkbox id="offer" className="h-5 w-5" />
            </div>
          </div>

          <h3 className=" mt-7 text-[18px] font-semibold mb-3">Amenities:</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Label htmlFor="parking">Parking</Label>
              <Checkbox id="parking" className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="furnished">Furnished</Label>
              <Checkbox id="furnished" className="h-5 w-5" />
            </div>
          </div>

          <div className="max-w-[200px] mt-7">
            <div className="mb-2 block">
              <h3 className=" mt-7 text-[18px] font-semibold mb-3">Sort:</h3>
            </div>
            <Select id="countries" required>
              <option>Price High to Low</option>
              <option>Price Low to High</option>
              <option>Latest</option>
              <option>Oldest</option>
            </Select>
          </div>
          <Button className="mt-7 w-full">SEARCH</Button>
        </form>
      </div>

      <div className="text-2xl font-semibold">Listing Results:</div>
    </div>
  );
};

export default Search;
