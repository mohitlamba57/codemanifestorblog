import React from "react";
import appwriteService from "../appwite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-50 box-border border-2 border-gray-100 hover:shadow-lg rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl border-white border-2"
          />
        </div>
        <h2 className="text-xl text-[#1A2130] font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
