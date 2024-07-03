import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../markdownStyles.css";

function BlogPost({ postId }) {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  let dataUrl = "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://block-blog-backend.onrender.com/api/blog/${postId}`,
        );
        if (response.ok) {
          const json = await response.json();
          setBlogData(json);
        } else {
          console.error("error");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId]);
  if (blogData) {
    const blob = new Blob([new Uint8Array(blogData.thumbnail.data)]);
    dataUrl = URL.createObjectURL(blob);
  }

  return (
    <>
      {loading && <p className="m-4">Loading...</p>}
      {blogData && (
        <div className="mx-auto my-10 w-[min(100vw,930px)]">
          <img
            src={dataUrl}
            alt="Cover Image"
            className="mx-auto overflow-hidden rounded-lg w-full"
          />
          <h1 className="mt-4 text-center px-4 text-4xl font-bold">
            {blogData.title}
          </h1>
          <div className="markdown-content mt-4 text-lg">
            <ReactMarkdown>{blogData.content}</ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogPost;
