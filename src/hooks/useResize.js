import { useEffect, useState } from "react";

const useResize = () => {
  const [count, setCount] = useState(12);
  const [elseCount, setElseCount] = useState(3);

  const setData = (width) => {
    if (width > 1023) {
      setCount(12);
      setElseCount(3);
    }
    if (width < 1024) {
      setCount(8);
      setElseCount(2);
    }

    if (width < 601) {
      setCount(5);
      setElseCount(2);
    }
  };

  useEffect(() => {
    const handleResize = (event) => {
      const deviceWidth = event.target.innerWidth;
      setData(deviceWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  useEffect(() => {
    setData(window.innerWidth);
  }, []);

  return {
    count,
    elseCount,
  };
};

export default useResize;
