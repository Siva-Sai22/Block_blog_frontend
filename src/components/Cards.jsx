import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cards() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://block-blog-backend.onrender.com/api/blogs");
        if (response.ok) {
          const json = await response.json();
          setBlogs(json);
        } else {
          console.error("error");
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="mx-auto w-[min(100vw,1120px)]">
        <p className="mx-2 mt-10 text-2xl">Featured</p>
        <p className="mx-2  mb-6 text-gray-500">
          The most interesting content collected by our team.
        </p>
        {loading && <p className="m-4">Loading...</p>}
        {!loading && (
          <div className="grid grid-cols-lay gap-4">
            {blogs.map((blog, index) => (
              <Card
                key={index}
                colSpanFull={index === 0}
                title={blog.title}
                image={blog.thumbnail}
                ipfs_hash={blog.ipfs_hash}
              ></Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Card({ ipfs_hash, title, colSpanFull, image }) {
  const cardClass = colSpanFull ? "col-span-full" : "";
  const cardRef = useRef(null);
  const [isNarrow, setIsNarrow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCardWidth = () => {
      if (cardRef.current) {
        setIsNarrow(cardRef.current.clientWidth < 500);
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => {
      window.removeEventListener("resize", updateCardWidth);
    };
  }, []);

  const handleCardClick = () => {
    navigate(`/blog/${ipfs_hash}`);
  };

  const blob = new Blob([new Uint8Array(image.data)]);
  const dataUrl = URL.createObjectURL(blob);

  return (
      <div
        ref={cardRef}
        className={`flex w-full cursor-pointer ${isNarrow ? "flex-col" : "flex-row"} rounded-2xl border-2 border-solid ${cardClass}`}
        onClick={handleCardClick}
      >
        <img
          src={dataUrl}
          alt=""
          className={`w-1/2 rounded-2xl ${isNarrow ? "w-full" : ""}`}
        />
        <div className="border-l-2 p-4">
          <p className={`mb-4 ${isNarrow ? "text-xl font-bold" : "text-3xl"}`}>
            {title}
          </p>
          <p>By Carl Cervone</p>
        </div>
      </div>
  );
}

export default Cards;

{/* <div className="grid-cols-lay grid gap-4">
          <Card colSpanFull={true} image={img1}></Card>
          <Card image={img2}></Card>
          <Card image={img3}></Card>
          <Card image={img2}></Card>
          <Card image={img3}></Card>
          <Card image={img2}></Card>
          <Card image={img3}></Card> */}