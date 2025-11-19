import { useEffect, useState } from "react";
import { CategoryCard } from "./category-card";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/api/categories/with-one-product`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ma'lumot yuklashda xatolik:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={`grid lg:grid-cols-4 md:grid-cols-3 lg:gap-7 grid-cols-2 sm:gap-4 gap-3`}>
      {loading ? (
        <p>Yuklanmoqda...</p>
      ) : categories.length > 0 ? (
        categories.map((category) => (
          <CategoryCard key={category.id} product={category} />
        ))
      ) : (
        <p>Hech qanday kategoriya topilmadi.</p>
      )}
    </div>
  );
};

export default CategoryGrid;
