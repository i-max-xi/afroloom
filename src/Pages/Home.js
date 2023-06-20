import React, { useEffect, useState } from "react";
import CardList from "../Components/CardList";
// import PageNav from "../Components/PageNav";
import TopCard from "../Components/TopCard";


        
// import Header from "../Components/Header";

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
