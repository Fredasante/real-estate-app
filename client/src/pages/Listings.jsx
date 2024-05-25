import { Button, Modal, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Listings = () => {
  const [showModal, setShowModal] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setloading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const getListings = async () => {
    try {
      setloading(true);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (res.ok) {
        setListings(data);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  console.log(listings);

  return (
    <div className="max-w-screen-xl mx-auto p-5">
      <h1 className="my-5 text-center font-semibold text-3xl">Listings</h1>

      {loading && (
        <div className="flex items-center justify-center mx-auto min-h-[20vh]">
          <Spinner size="xl" />
        </div>
      )}

      <section className="table-auto overflow-x-scroll md:mx-auto mt-7 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
        <>
          <Table className="shadow-sm border">
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Type</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>

            {listings &&
              listings.map((listing) => (
                <Table.Body key={listing._id} className="divide-y">
                  <Table.Row className="dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(listing.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{listing.name}</Table.Cell>

                    <Table.Cell>
                      <Link
                        className="text-gray-900 dark:text-gray-100"
                        to={`/listing/${listing._id}`}
                      >
                        {listing.description}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/listing/${listing._id}`}>
                        <img
                          src={listing.imageUrls[0]}
                          alt={listing.name}
                          className="w-20 h-10 object-cover rounded-md bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/listing/${listing._id}`}>{listing.type}</Link>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to={`/update-listing/${listing._id}`}
                        className="text-teal-500"
                      >
                        <span className="font-medium hover:underline text-teal-500 cursor-pointer">
                          Edit
                        </span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
          {listings.length === 0 && (
            <div className="my-7 text-center w-full">No Listings Found!</div>
          )}
          {/* {showMore && (
          <button
            onClick={handleShowMore}
            className="self-center w-full my-7 text-teal-500"
          >
            Show More
            <FaAngleDown className="inline-block ml-1 text-xl" />
          </button>
        )} */}
        </>
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
                Are you sure you want to delete this listing?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure">{"Yes, I'm sure"}</Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </section>
    </div>
  );
};

export default Listings;
