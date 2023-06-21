import React, { useEffect, useState } from "react";
import CardList from "../Components/CardList";
import TopCard from "../Components/TopCard";


const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [showNestedComponent, setShowNestedComponent] = useState(true);
    
  useEffect(() => {
    if (currentPage !== 0) {
      setShowNestedComponent(false);
    }
    else {
      setShowNestedComponent(true);
    }
  }, [currentPage]);

  return (
    <div>
      {/* <Header /> */}
      {showNestedComponent && <TopCard /> }
      <CardList currentPage={currentPage} setCurrentPage={setCurrentPage} showNestedComponent={showNestedComponent}/>
      {/* <PageNav /> */}
    </div>
  );
};

export default Home;
