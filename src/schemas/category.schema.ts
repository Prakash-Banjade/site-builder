import { ECategoryType } from "@/db/schema/category";
import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, { message: "Category Name is required" }).trim(),
  type: z.nativeEnum(ECategoryType, {
    required_error: "Category Type is required",
  }),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;

export const categoryFormDefaultValues: CategorySchemaType = {
  name: "",
  type: ECategoryType.BLOG,
};