"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { CategoryForm } from "./category-form";

const NewCategoryBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus /> New Category
      </Button>
      <ResponsiveDialog
        title={"Create Category"}
        description={"Add a new category to organize your content."}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <CategoryForm setIsOpen={setIsOpen} />
      </ResponsiveDialog>
    </>
  );
};

export default NewCategoryBtn;
