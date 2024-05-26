import { Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ContactLandlord = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();

        if (res.ok) {
          setLandlord(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLandlord();
  }, [listing.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <>
        {landlord && (
          <div className="flex flex-col gap-2 my-7">
            <p>
              Contact <span className="font-semibold">{landlord.username}</span>{" "}
              for <span className="font-semibold">{listing.name}</span>
            </p>
            <Textarea
              id="comment"
              placeholder="Leave a message..."
              required
              rows={3}
              value={message}
              onChange={onChange}
            />

            <Link
              to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            >
              ,
              <Button className="w-full" color="dark">
                Send Message
              </Button>
            </Link>
          </div>
        )}
      </>
    </div>
  );
};

export default ContactLandlord;
