import React from "react";

const StoryList = ({ stories, onStoryClick }) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap no-scrollbar px-4 pt-10 pb-2">
      <div className="flex gap-3">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="text-center cursor-pointer inline-block"
            onClick={() => onStoryClick(index)}
          >
            <div className="w-20 h-20 rounded-full p-[3px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500">
              <div className="w-full h-full rounded-full bg-white p-1">
                <img
                  src={story.avatar}
                  alt="avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            <p className="text-xs mt-1 text-black font-normal">
              {story.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryList;
