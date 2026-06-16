import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
    const imageUrl =
        appwriteService.getFilePreview(featuredImage);

    console.log("Post ID:", $id);
    console.log("Title:", title);
    console.log("Featured Image ID:", featuredImage);
    console.log("Image URL:", imageUrl);

    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full flex justify-center mb-4">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="rounded-xl w-full h-48 object-cover"
                        onError={(e) => {
                            console.log(
                                "Image failed to load:",
                                imageUrl
                            );
                        }}
                    />
                </div>

                <h2 className="text-xl font-bold">
                    {title}
                </h2>
            </div>
        </Link>
    );
}

export default PostCard;