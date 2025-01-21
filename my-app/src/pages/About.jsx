import React, { useState } from 'react';

export const About = () => {
  const [count, setCount] = useState(0); 

  const increment = () => {
    setCount(count + 1); 
  };

  return (
    <div>
      <h1>Current Count: {count}</h1>
      <button onClick={increment}>Increment</button> 
    </div>
  );
};
export default About;