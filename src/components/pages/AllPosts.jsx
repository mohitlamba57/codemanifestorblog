import React, { useEffect, useState } from "react";
import appwriteService from "../../appwite/config";
import { Container, PostCard } from "../../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap flex-col lg:flex-row">
          {posts.map((post) => {
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
}

export default Home;
