import {
  Button,
  Checkbox,
  FileInput,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import React from "react";

const CreateListing = () => {
  return (
    <main className="max-w-screen-xl xl:min-h-[100vh] md:pb-10 mx-auto p-5 bg-gray-100">
      <h1 className="text-center font-semibold text-xl lg:text-3xl my-3 lg:my-6">
        Create a Listing
      </h1>

      <form className="bg-white flex flex-col md:flex-row gap-10 md:gap-14 lg:gap-20 max-w-5xl mx-auto shadow-sm p-5 rounded-lg">
        <div className="flex flex-col justify-center flex-1 gap-4">
          <div>
            <Label value="Enter Name" />
            <TextInput
              type="text"
              placeholder="Name"
              id="name"
              className="mt-1"
              maxLength={62}
              minLength={10}
              required
            />
          </div>
          <div>
            <Label value="Enter Description" />
            <Textarea
              placeholder="Description"
              id="description"
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label value="Enter Address" />
            <TextInput
              type="text"
              placeholder="Address"
              id="address"
              className="mt-1"
              required
            />
          </div>

          <div className="flex flex-wrap gap-6 mt-3">
            <div className="flex items-center gap-2">
              <Checkbox id="sale" className="h-5 w-5" />
              <Label htmlFor="sale">Sell</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="rent" className="h-5 w-5" />
              <Label htmlFor="rent">Rent</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="parking" className="h-5 w-5" />
              <Label htmlFor="parking">Parking Spot</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="furnsihed" className="h-5 w-5" />
              <Label htmlFor="furnsihed">Furnished</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="offer" className="h-5 w-5" />
              <Label htmlFor="offer">Offer</Label>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex justify-center items-center gap-2">
              <TextInput
                type="number"
                id="bedrooms"
                className="mt-1 w-14"
                required
              />
              <Label value="Beds" />
            </div>
            <div className="flex justify-center gap-2 items-center">
              <TextInput
                type="number"
                id="bathrooms"
                className="mt-1 w-14"
                required
              />
              <Label value="Baths" />
            </div>
            <div className="flex justify-center gap-2 items-center">
              <TextInput
                type="number"
                id="regularPrice"
                className="mt-1 w-20"
                required
              />
              <Label>
                <span className="block text-md">Regular Price</span>
                <span className="text-xs">(GH₵ / Month)</span>
              </Label>
            </div>
            <div className="flex justify-center gap-2 items-center">
              <TextInput
                type="number"
                id="discountPrice"
                className="mt-1 w-20"
                required
              />
              <Label>
                <span className="block text-md">Discount Price</span>
                <span className="text-xs">(GH₵ / Month)</span>
              </Label>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div>
            <Label
              htmlFor="file-upload-helper-text"
              value="IMAGES: The first image will be the cover. (MAX. 6)"
            />
          </div>
          <div className="flex items-center mt-4 gap-4">
            <FileInput
              id="file-upload-helper-text"
              accept="images/*"
              multiple
              className="mr-auto"
            />
            <Button outline>UPLOAD</Button>
          </div>
          <Button className="my-7">CREATE LISTING</Button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
