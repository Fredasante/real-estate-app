import { Alert, Button, Modal, Spinner, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  UpdateFailure,
  UpdateStart,
  UpdateSuccess,
  DeleteUserStart,
  DeleteUserSuccess,
  DeleteUserFailure,
  SignOutStart,
  SignOutSuccess,
  SignOutFailure,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Profile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state.user);

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImageFileUrl(url);
    }
  };

  useEffect(() => {
    if (imageFile) {
      handleUploadImage();
    }
  }, [imageFile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        console.log("Error uploading file:", error);
        setImageFileUploadError("Could not upload Image. (Max size: 2MB)");
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        // console.log("Upload complete");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, avatar: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("Please update at least one field");
      return;
    }
    try {
      dispatch(UpdateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(UpdateSuccess(data));
        setUpdateUserSuccess("Profile updated successfully!");
        setUpdateUserError(null);
      }
      if (!res.ok) {
        dispatch(UpdateFailure(data.message));
      }
    } catch (error) {
      dispatch(UpdateFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(DeleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(DeleteUserSuccess());
        console.log("User has been deleted!");
      }
    } catch (error) {
      console.log(error.message);
      dispatch(DeleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(SignOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (res.ok) {
        dispatch(SignOutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      dispatch(SignOutFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full mb-10">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 p-5 lg:p-10 rounded-lg border shadow-sm"
      >
        <input
          onChange={handleImageChange}
          ref={fileRef}
          type="file"
          hidden
          accept="image/*"
        />
        <div
          onClick={() => fileRef.current.click()}
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.avatar}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="mt-[2px] ml-1">Loading...</span>
            </>
          ) : (
            "UPDATE"
          )}
        </Button>
        <Link to="/create-post">
          <Button className="w-full" outline type="button">
            CREATE LISTING
          </Button>
        </Link>
      </form>
      <div className="flex justify-between mt-5 p-3 md:p-0">
        <span
          onClick={() => setShowModal(true)}
          className="text-red-500 cursor-pointer"
        >
          Delete Account?
        </span>
        <span onClick={handleSignOut} className="text-teal-500 cursor-pointer">
          Sign Out
        </span>
      </div>
      {updateUserError && (
        <Alert className="mt-4" color="failure">
          {updateUserError}
        </Alert>
      )}
      {updateUserSuccess && (
        <Alert className="mt-4" color="success">
          {updateUserSuccess}
        </Alert>
      )}
      {error && (
        <Alert className="mt-4" color="failure">
          {error}
        </Alert>
      )}

      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
