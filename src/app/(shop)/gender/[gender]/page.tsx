export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { gender } = params;

  if (!Object.values(Gender).includes(gender as Gender)) {
    notFound();
  }

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({
      page,
      gender: gender as Gender,
    });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const label: Record<string, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };

  //if(id === 'kids' ){
  //  notFound()
  //}

  return (
    <div>
      <Title
        title={gender}
        subtitle={`Articulos ${label[gender]}`}
        className="mb-2 capitalize"
      />
      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default CategoryPage;
