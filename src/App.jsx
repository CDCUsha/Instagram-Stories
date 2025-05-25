import React, { useState } from "react";
import StoryList from "./Components/StoryList.jsx";
import StoryViewer from "./Components/StoryViewer.jsx";
import storiesData from "./data/stories.json";

function App() {
  const [currentUserIndex, setCurrentUserIndex] = useState(null);
  const [storyStartIndex, setStoryStartIndex] = useState(0);

  const handleStoryClick = (index) => {
    setCurrentUserIndex(index);
    setStoryStartIndex(0);
  };

  const handleNextUser = () => {
    if (currentUserIndex < storiesData.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setStoryStartIndex(0);
    } else {
      setCurrentUserIndex(null);
    }
  };

  const handlePrevUser = () => {
    if (currentUserIndex > 0) {
      const prevUserIndex = currentUserIndex - 1;
      setCurrentUserIndex(prevUserIndex);
      setStoryStartIndex(storiesData[prevUserIndex].stories.length - 1);
    } else {
      setCurrentUserIndex(null);
    }
  };

  const closeViewer = () => {
    setCurrentUserIndex(null);
  };

  return (
    <div className="no-scrollbar bg-white w-full h-screen overflow-hidden">
      <StoryList stories={storiesData} onStoryClick={handleStoryClick} />

      {currentUserIndex !== null && (
        <StoryViewer
          story={storiesData[currentUserIndex]}
          startIndex={storyStartIndex}
          onClose={closeViewer}
          onNextUser={handleNextUser}
          onPrevUser={handlePrevUser}
        />
      )}
    </div>
  );
}

export default App;
