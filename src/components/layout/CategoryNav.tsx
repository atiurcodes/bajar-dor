import { getCategories } from "@/lib/api";
import CategoryNavClient from "./CategoryNavClient";

const CategoryNav = async () => {
    const categories = await getCategories();

    return <CategoryNavClient categories={categories} />;
};

export default CategoryNav;