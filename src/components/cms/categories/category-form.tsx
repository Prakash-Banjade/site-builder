"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showServerError } from "@/lib/utils";
import { ECategoryType, TCategoryTableSelect } from "@/db/schema/category";
import { useForm } from "react-hook-form";
import { categoryFormDefaultValues, categorySchema, CategorySchemaType } from "@/schemas/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import LoadingButton from "@/components/forms/loading-button";
import { createCategory, updateCategory } from "@/lib/actions/categories.action";

export const CategoryForm = ({ defaultValues, setIsOpen }: {
    defaultValues?: Omit<TCategoryTableSelect, "createdAt" | "updatedAt">;
    setIsOpen?: (isOpen: boolean) => void;
}) => {
    const isEditing = !!defaultValues;
    const [isPending, startTransition] = useTransition();

    const form = useForm<CategorySchemaType>({
        resolver: zodResolver(categorySchema),
        defaultValues: defaultValues ?? categoryFormDefaultValues,
    });

    const onSubmit = (values: CategorySchemaType) => {
        startTransition(async () => {
            try {
                isEditing
                    ? await updateCategory(defaultValues.id, values)
                    : await createCategory(values);

                toast.success(isEditing ? "Category updated" : "Category created");
                if (setIsOpen) setIsOpen(false);
            } catch (err) {
                showServerError(err);
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category Name <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Input required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type <span className="text-destructive">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                <FormControl>
                                    <SelectTrigger className="w-full py-5">
                                        <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(ECategoryType).map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <LoadingButton
                    isLoading={isPending}
                    loadingText="Saving..."
                    type="submit"
                >
                    Save
                </LoadingButton>
            </form>
        </Form>
    );
};