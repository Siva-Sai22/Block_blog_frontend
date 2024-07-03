import BlogPost from "../components/BlogPost";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function Blog() {
  const { id } = useParams();
  return (
    <>
      <Header />
      <BlogPost postId={id} />
    </>
  );
}

export default Blog;
