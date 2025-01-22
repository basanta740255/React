import React, { useLayoutEffect, useState, useRef } from "react";

const AutoResizeText = () => {
  const [content, setContent] = useState(
    "Try typing or pasting some text here to see the container adapt!"
  );
  const [containerHeight, setContainerHeight] = useState(0);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    if (textRef.current) {
      const textHeight = textRef.current.scrollHeight;
      setContainerHeight(textHeight + 20); // Add padding for better visual appearance
    }
  }, [content]);

  const presetTexts = [
    "This is a short text.",
    "This is a medium length text that will cause the container to grow a bit more than the previous one.",
    "This is a much longer text that will demonstrate how the container adapts to larger content. It will show multiple lines and adjust the height accordingly. The useLayoutEffect hook ensures this happens synchronously to prevent any visual flickering.",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="space-y-4">
        {/* Preset Text Buttons */}
        <div className="flex flex-wrap gap-2">
          {presetTexts.map((text, index) => (
            <button
              key={index}
              onClick={() => setContent(text)}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Sample Text {index + 1}
            </button>
          ))}
        </div>

        {/* Resizable Text Area */}
        <div
          className="relative border rounded-lg bg-white shadow-sm transition-all duration-300"
          style={{ height: `${containerHeight}px` }}
        >
          <textarea
            ref={textRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full p-4 resize-none outline-none rounded-lg"
            placeholder="Type or paste text here..."
            aria-label="Resizable text input"
          />
        </div>

        {/* Display Current Container Height */}
        <div className="text-sm text-gray-600">
          Current container height: {containerHeight}px
        </div>

        {/* Explanation Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">How it works:</h3>
          <p className="text-sm text-gray-700">
            The <code>useLayoutEffect</code> hook measures the content height and
            updates the container size synchronously before the browser paints. This
            prevents any flickering that might occur with <code>useEffect</code>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutoResizeText;
