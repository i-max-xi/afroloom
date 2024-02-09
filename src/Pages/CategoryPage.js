import React, { useEffect } from "react";
import Nav from "../Components/Nav";
import { allCategory } from "../Data/categoryList";
import { CategoryTemplate } from "../Components/CategorySwipe";
import uuid from "react-uuid";

const CategoryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  return (
    <>
      <Nav />
      <div className="bg-dark container text-center p-2 mb-5 category-page-container">
        <h3 className="text-white mt-2">Category</h3>
        <div className="row">
          {allCategory.map(({ image, name}) => (
            <div key={uuid()} className="text-decoration-none mx-3 mt-5 p-0 col-5 col-sm-2">
              <CategoryTemplate
                image={image}
                name={name}
                selectedColor="white"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
