import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useWeb3js } from "../hooks/useWeb3";

function BlogForm() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();

  const {createBlog} = useWeb3js();

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    try {
      Resizer.imageFileResizer(file,930,465,"JPEG",100,0,
        (uri) => {
          setThumbnail(uri);
        },"file",300,300,);
    } catch (error) {
      console.error("Error resizing image:", error);
    }
  };

  const sendBlog = async () => {
    const formData = new FormData();

    formData.append("thumbnail", thumbnail);
    formData.append("content", value);
    formData.append("title", title);

    try {
      setLoading(true);
      const response = await axios({
        url: `https://block-blog-backend.onrender.com/api/blog`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        data: formData,
      });

      if (response.status === 200) {
        const responseData = response.data;
        navigate(`/blog/${responseData.IpfsHash}`);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="m-4 text-2xl">Create a New Blog</h2>
        <button
          className="mr-7 rounded-lg bg-blue-500 px-4 py-1  text-white"
          onClick={sendBlog}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>

      <label htmlFor="title" className="ml-4 mr-2 text-xl">
        {" "}
        Title:{" "}
      </label>
      <input
        type="text"
        id="title"
        className="rounded-lg border-2 px-2 py-1"
        size={34}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <br />

      <label htmlFor="thumbnail" className="ml-4 mr-2 text-xl">
        Cover Image:
      </label>
      <div className="relative mt-4 inline-block">
        <input
          type="file"
          id="thumbnail"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="hidden"
        />
        <label
          htmlFor="thumbnail"
          className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          Choose File
        </label>
        <span className="ml-4 text-gray-500">
          {!thumbnail ? "Upload a file" : `Uploaded.`}
        </span>
      </div>

      <div className="m-4 h-[700px]">
        <MDEditor value={value} onChange={setValue} height={700} />
      </div>
    </>
  );
}

export default BlogForm;

