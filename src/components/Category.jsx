import React, { useState } from 'react';

// 카테고리 목록을 상수로 정의하여 관리 용이성을 높입니다.
const CATEGORIES = ['보이스피싱', '종교', '사기', '마약', '기타'];

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log(`'${category}' 카테고리가 선택되었습니다.`);
  };

  return (
    <div className="font-sans flex flex-row gap-[16px] justify-start w-full mt-[30px]">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`
            rounded-[50px] px-[16px] py-[4px] text-[16px] 
            transition-all duration-300 ease-in-out
            ${
              selectedCategory === category
                ? 'bg-primary text-white shadow-lg scale-105' 
                : 'bg-white text-gray-600 shadow-md hover:bg-gray-100 hover:shadow-lg'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Category;