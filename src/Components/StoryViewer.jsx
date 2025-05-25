import React, { useEffect, useState, useRef } from "react";

const StoryViewer = ({
  story,
  startIndex = 0,
  onClose,
  onNextUser,
  onPrevUser,
}) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [loading, setLoading] = useState(true);

  const progressTimeoutRef = useRef(null);
  const autoAdvanceTimeoutRef = useRef(null);

  useEffect(() => {
    if (loading) {
      clearTimeout(progressTimeoutRef.current);
      clearTimeout(autoAdvanceTimeoutRef.current);
      return;
    }

    progressTimeoutRef.current = setTimeout(() => {}, 50);

    autoAdvanceTimeoutRef.current = setTimeout(() => {
      if (currentIndex < story.stories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        if (onNextUser) onNextUser();
        else onClose();
      }
    }, 5000);

    return () => {
      clearTimeout(progressTimeoutRef.current);
      clearTimeout(autoAdvanceTimeoutRef.current);
    };
  }, [currentIndex, loading, story.stories.length, onClose, onNextUser]);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [story, startIndex]);

  useEffect(() => {
    setLoading(true);
  }, [currentIndex]);

  const handleClick = (e) => {
    const { clientX, currentTarget } = e;
    const middle = currentTarget.offsetWidth / 2;

    if (clientX < middle) {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else {
        if (onPrevUser) {
          onPrevUser(story.stories.length - 1); 
        } else {
          onClose();
        }
      }
    } else {
      if (currentIndex < story.stories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        if (onNextUser) onNextUser();
        else onClose();
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center"
    >
      <div className="absolute top-10 left-4 right-4 flex items-center gap-3">
        <img
          src={story.avatar}
          alt={story.username}
          className="w-10 h-10 rounded-full object-cover border-2 border-white"
          draggable={false}
        />
        <span className="text-white font-semibold text-lg">
          {story.username}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="ml-auto text-white text-3xl font-bold cursor-pointer"
        >
          &times;
        </button>
      </div>

      <div className="absolute top-4 left-1 right-1 flex gap-1">
        {story.stories.map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-1 bg-white/30 rounded overflow-hidden"
          >
            {idx === currentIndex && (
              <div
                className="h-full bg-white rounded"
                style={{
                  animation: loading
                    ? "none"
                    : "progressFill 5s linear forwards",
                }}
              />
            )}
            {idx < currentIndex && (
              <div className="h-full bg-white rounded w-full" />
            )}
          </div>
        ))}
      </div>

      {/* {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )} */}

      <img
        key={currentIndex} 
        src={story.stories[currentIndex]}
        alt={`Story ${currentIndex + 1}`}
        className={`max-w-full max-h-full object-contain transition-opacity duration-300 `}
        onLoad={() => setLoading(false)}
        draggable={false}
      />
    </div>
  );
};

export default StoryViewer;
