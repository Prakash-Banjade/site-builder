"use server";

import { db } from "@/db";
import checkAuth from "../utilities/check-auth";
import { throwZodErrorMsg } from "../utils";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { categorySchema, CategorySchemaType } from "@/schemas/category.schema";
import { categoryTable } from "@/db/schema/category";

export async function createCategory(values: CategorySchemaType) {
  await checkAuth("admin");

  const { success, data, error } = categorySchema.safeParse(values);

  if (!success) throwZodErrorMsg(error);

  // check if category is duplicate
  const [existing] = await db
    .select({ id: categoryTable.id })
    .from(categoryTable)
    .where(
      and(...[eq(categoryTable.name, data.name), eq(categoryTable.type, data.type)])
    );

  if (existing) throw new Error("Duplicate category");

  const inserted = await db
    .insert(categoryTable)
    .values({ ...data })
    .returning({ id: categoryTable.id });

  if (inserted.length === 0) throw new Error("Failed to create category");

  revalidatePath(`/cms/categories`);

  return { id: inserted[0].id };
}

export async function deleteCategory(id: string) {
  await checkAuth("admin");

  await db.delete(categoryTable).where(eq(categoryTable.id, id));

  revalidatePath(`/cms/categories`);
}

export async function updateCategory(
  id: string,
  values: Partial<CategorySchemaType>
) {
  await checkAuth("admin");

  const { success, data, error } = categorySchema.partial().safeParse(values);

  if (!success) throwZodErrorMsg(error);

  const [existing] = await db
    .select({ name: categoryTable.name, type: categoryTable.type })
    .from(categoryTable)
    .where(eq(categoryTable.id, id))
    .limit(1);

  if (!existing) throw new Error("Category not found");

  const [duplicate] = await db
    .select({ id: categoryTable.id })
    .from(categoryTable)
    .where(
      and(
        ...[
          eq(categoryTable.name, data.name || existing.name),
          eq(categoryTable.type, data.type || existing.type),
        ]
      )
    );

  if (duplicate) throw new Error("Duplicate category");

  await db
    .update(categoryTable)
    .set({ ...data })
    .where(eq(categoryTable.id, id));

  revalidatePath(`/cms/categories`);
}
