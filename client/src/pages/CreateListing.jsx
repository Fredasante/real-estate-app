import {
  Alert,
  Button,
  Checkbox,
  FileInput,
  Label,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { set } from "mongoose";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image upload failed. (2MB Max per Image)!");
          setUploading(false);
        });
    } else {
      setImageUploadError("Please select between 1 and 6 images!");
      setUploading(false);
    }
  };

  console.log(formData);

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDeleteImage = (index) => () => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
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
              <Checkbox id="furnished" className="h-5 w-5" />
              <Label htmlFor="furnished">Furnished</Label>
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
              htmlFor="images"
              value="IMAGES: The first image will be the cover. (MAX. 6)"
            />
          </div>
          <div className="flex items-center mt-4 gap-4">
            <FileInput
              onChange={(e) => setFiles(e.target.files)}
              id="images"
              accept="images/*"
              multiple
              className="mr-auto"
            />
            <Button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              outline
            >
              {uploading ? (
                <>
                  <Spinner size="sm" />
                  <span className="mt-[2px] ml-1">Uploading...</span>
                </>
              ) : (
                "UPLOAD"
              )}
            </Button>
          </div>
          {imageUploadError && (
            <Alert color="failure" className="mt-5">
              {imageUploadError}
            </Alert>
          )}

          {formData.imageUrls.length > 0 && (
            <div className="flex flex-col gap-4 mt-4">
              {formData.imageUrls.map((url, index) => (
                <div className="flex" key={url}>
                  <img
                    key={index}
                    src={url}
                    alt="Listing Image"
                    className="w-[200px] h-[100px] object-cover rounded-md mr-auto"
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleDeleteImage(index)}
                      type="button"
                      color="failure"
                      size="sm"
                    >
                      DELETE
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button className="my-7">CREATE LISTING</Button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
