import React from "react";

const PostPreview = ({
  title = "Post Preview",
  platformIcon,
  platformName = "Instagram",
  profileImage,
  profileName,
  profileDescription,
  postImage,
  stats = { likes: 0, comments: 0, saves: 0 },
  description,
}: any) => {
  return (
    <div className="md:w-1/3 flex flex-col p-4 rounded-lg">
      {/* Title */}
      <div className="relative mb-4">
        <span className="cursor-pointer text-[#FFFFFF] relative group text-xl font-medium">
          {title}
          <span className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-[#5B97FF] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </span>
      </div>

      <div className="w-full p-2 bg-[#1A1442] text-white rounded-md mb-4">
        <div className="flex justify-center gap-2 items-center">
          {platformIcon && <img src={platformIcon} alt={platformName} className="w-5 h-5" />}
          <span>{platformName}</span>
        </div>
      </div>

      <div
        className="p-4 rounded-xl"
        style={{
          background:
            "linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)",
          border: "1px solid rgba(108, 140, 255, 0.5)",
          boxShadow: "0px 10.64px 20.39px 0px rgba(62, 73, 84, 0.04)",
        }}
      >
        <div className="flex items-center space-x-2 mb-4">
          {profileImage && <img src={profileImage} alt="profile" className="w-10 h-10 rounded-full" />}
          <div className="flex flex-col">
            <span className="text-[#FFFFFF] font-medium text-xl">{profileName}</span>
            <small className="text-xs font-medium text-gray-400">{profileDescription}</small>
          </div>
        </div>

        <div className="w-full h-48 rounded-md">
          <img src={postImage} className="h-full w-full object-fill" alt="post preview" />
        </div>

        <div className="flex justify-between items-center mt-2 text-sm">
          <div className="flex justify-between gap-4">
            <div className="flex gap-2 items-center">
              <img src="/path-to-heart-icon" alt="likes" />
              <span className="text-xs font-medium text-gray-400">{stats.likes}</span>
            </div>
            <div className="flex gap-2 items-center">
              <img src="/path-to-comment-icon" alt="comments" />
              <span className="text-xs font-medium text-gray-400">{stats.comments}</span>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-end">
            <img src="/path-to-bookmark-icon" alt="saves" />
            <span className="text-xs font-medium text-gray-400">{stats.saves}</span>
          </div>
        </div>

        <p
          className="h-auto mt-2 text-white rounded text-sm"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 4,
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default PostPreview;
