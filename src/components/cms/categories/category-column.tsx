"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, SquarePen, Star, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DestructiveDropdownMenuButtonItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ResponsiveAlertDialog } from "@/components/ui/responsive-alert-dialog";
import { toast } from "sonner";
import { TCategoryTableSelect } from "@/db/schema/category";
import { deleteCategory } from "@/lib/actions/categories.action";
import { showServerError } from "@/lib/utils";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { CategoryForm } from "./category-form";

export const categoriesColumns: ColumnDef<Omit<TCategoryTableSelect, "createdAt" | "updatedAt">>[] = [
  {
    header: "S.N",
    cell: ({ row }) => <p className="text-14 font-medium"> {row.index + 1} </p>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Related To",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.type}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return <CategoriesColumnActions category={category} />;
    },
  },
];

function CategoriesColumnActions({ category }: { category: Omit<TCategoryTableSelect, "createdAt" | "updatedAt"> }) {
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  function handleDelete() {
    startDeleteTransition(async () => {
      try {
        await deleteCategory(category.id);
        toast.success("Category deleted");
      } catch (e) {
        showServerError(e);
      } finally {
        setIsDeleteOpen(false);
      }
    });
  }

  return (
    <>
      <ResponsiveDialog
        title={"Update Category"}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      >
        <CategoryForm defaultValues={category} setIsOpen={setIsEditOpen} />
      </ResponsiveDialog>

      <ResponsiveAlertDialog
        title="Delete Category"
        description="Are you sure want to delete this category?"
        action={handleDelete}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        isLoading={isDeleting}
        actionLabel="Yes, Delete"
        loadingText="Deleting..."
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            <SquarePen />
            Edit
          </DropdownMenuItem>
          <DestructiveDropdownMenuButtonItem
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash className="text-destructive" />
            Delete
          </DestructiveDropdownMenuButtonItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
