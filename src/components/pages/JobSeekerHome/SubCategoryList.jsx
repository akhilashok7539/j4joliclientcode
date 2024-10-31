
const SubCategoryList = ({ subCategory }) => {
  console.log(subCategory)
  return (
    <div className="sub-category">
      {subCategory.map((item, index) => {
        return (
          <p className="sub-category-item" key={index}>
          {item.name},
          </p>
        );
      })}
    </div>
  );
};

export default SubCategoryList;
