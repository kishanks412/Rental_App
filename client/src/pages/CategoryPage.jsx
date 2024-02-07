import { useState, useEffect } from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);

  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `${backend_url}properties?category=${category}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      // console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title-list">{category} listings</h1>
        {listings == "" ? (
          <p className="para">Nothing to Show</p>
        ) : (
        <div className="list">
          {listings?.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              title,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                title={title}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
