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
import { useEffect, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 1200,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { listingId } = useParams();

  useEffect(() => {
    const getListing = async () => {
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();

      if (res.ok) {
        setFormData(data);
      }
    };
    getListing();
  }, []);

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

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "furnished" ||
      e.target.id === "parking" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        setError("Please upload at least one image!");
        return;
      }
      if (+formData.discountPrice > +formData.regularPrice) {
        setError("Discount price cannot be greater than regular price!");
        return;
      }
      setError(false);
      setLoading(true);
      const res = await fetch(`/api/listing/update/${listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
      }
      if (res.ok) {
        setLoading(false);
        navigate(`/listing/${listingId}`);
        setFormData(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(formData);

  return (
    <main className="max-w-screen-xl xl:min-h-[100vh] md:pb-10 mx-auto p-5 bg-gray-100">
      <h1 className="text-center font-semibold text-xl lg:text-3xl my-3 lg:my-6">
        Edit Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col md:flex-row gap-10 md:gap-14 lg:gap-20 max-w-5xl mx-auto shadow-sm p-5 rounded-lg"
      >
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
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div>
            <Label value="Enter Description" />
            <Textarea
              placeholder="Description"
              id="description"
              className="mt-1"
              required
              onChange={handleChange}
              value={formData.description}
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
              onChange={handleChange}
              value={formData.address}
            />
          </div>

          <div className="flex flex-wrap gap-6 mt-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="sale"
                className="h-5 w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <Label htmlFor="sale">Sell</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="rent"
                className="h-5 w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <Label htmlFor="rent">Rent</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="parking"
                className="h-5 w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <Label htmlFor="parking">Parking Spot</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="furnished"
                className="h-5 w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <Label htmlFor="furnished">Furnished</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="offer"
                className="h-5 w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
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
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <Label value="Beds" />
            </div>
            <div className="flex justify-center gap-2 items-center">
              <TextInput
                type="number"
                id="bathrooms"
                className="mt-1 w-14"
                required
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <Label value="Baths" />
            </div>
            <div className="flex justify-center gap-2 items-center">
              <TextInput
                type="number"
                id="regularPrice"
                className="mt-1 w-20"
                required
                onChange={handleChange}
                value={formData.regularPrice}
              />
              {formData.type === "sale" ? (
                ""
              ) : (
                <Label>
                  <span className="block text-md">Regular Price</span>
                  <span className="text-xs">(GH₵ / Month)</span>
                </Label>
              )}
            </div>
            {formData.offer && (
              <div className="flex justify-center gap-2 items-center">
                <TextInput
                  type="number"
                  id="discountPrice"
                  className="mt-1 w-20"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                {formData.type === "sale" ? (
                  ""
                ) : (
                  <Label>
                    <span className="block text-md">Discount Price</span>
                    <span className="text-xs">(GH₵ / Month)</span>
                  </Label>
                )}
              </div>
            )}
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
                    className="w-[120px] h-[60px] object-cover rounded-md mr-auto"
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
          <Button
            type="sumbit"
            className="my-7"
            disabled={loading || uploading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="ml-2">Loading...</span>
              </>
            ) : (
              "UPDATE LISTING"
            )}
          </Button>
          {error && (
            <Alert color="failure" className="mt-5">
              {error}
            </Alert>
          )}
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
