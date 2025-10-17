import { CategoriesPageProps } from "@/app/(cms)/cms/categories/page";
import { DataTable } from "@/components/data-table/data-table";
import { db } from "@/db";
import { and, eq, ilike, sql, SQL } from "drizzle-orm";
import { categoriesColumns } from "./category-column";
import CategoriesSearchFilters from "./categories-search";
import { categoryTable, ECategoryType } from "@/db/schema/category";

export default async function CategoriesList({
  searchParams,
}: {
  searchParams: CategoriesPageProps["searchParams"];
}) {
  const { q, type } = searchParams;

  const filters: SQL[] = [];

  if (q) filters.push(ilike(categoryTable.name, `%${q}%`));
  if (type) filters.push(eq(categoryTable.type, type as ECategoryType));

  const foundCategories = await db
    .select({
      id: categoryTable.id,
      name: categoryTable.name,
      type: categoryTable.type,
    })
    .from(categoryTable)
    .where(and(...filters))
    .orderBy(sql`lower(${categoryTable.name})`);

  return (
    <>
      <CategoriesSearchFilters />

      <DataTable columns={categoriesColumns} data={foundCategories} />

      <section>
        <span className="text-sm text-muted-foreground">
          {foundCategories.length} Catagories(s)
        </span>
      </section>
    </>
  );
}
