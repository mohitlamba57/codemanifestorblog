import React, { useEffect, useState } from "react";
import appwriteService from "../../appwite/config";
import { Container, PostCard } from "../../components";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    appwriteService
      .getPosts([Query.equal("userId", userData.$id)])
      .then((posts) => {
        if (posts) setPosts(posts.documents);
        setLoading(false);
      });
  }, []);
  console.log(posts);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold hover:text-gray-500">
            {loading ? "Loading..." : "No Posts Found :("}
          </h1>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MyPosts;
