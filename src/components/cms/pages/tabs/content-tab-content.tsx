import { TPageDto, TPageSection } from "@/schemas/page.schema";
import { useFieldArray, useFormContext } from "react-hook-form"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown, ChevronUp, Copy, GripVertical, MoreHorizontal, Plus, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import BlockField from "./block-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const sectionDefaultValue: TPageSection = {
    title: "",
    headline: "",
    subheadline: "",
    blocks: {
        direction: "horizontal",
        items: []
    },
    container: false,
}

export default function ContentTabContent() {
    const form = useFormContext<TPageDto>();

    const { fields, append, remove, swap, insert } = useFieldArray({
        control: form.control,
        name: "sections",
    });

    return (
        <section className="space-y-2">
            <p className="text-sm font-medium">Sections <span className="text-destructive">*</span></p>
            {
                form.formState.errors.sections && <p className="text-destructive text-sm">{form.formState.errors.sections?.message || form.formState.errors.sections?.root?.message}</p>
            }
            <section className="space-y-2">
                {
                    fields.map((f, idx) => {
                        return (
                            <FormField
                                key={f.id}
                                control={form.control}
                                name={`sections.${idx}`}
                                render={({ field }) => {
                                    const fieldError = Array.isArray(form.formState.errors.sections) && !!form.formState.errors.sections[idx];

                                    return (
                                        <FormItem>
                                            <FormControl>
                                                <Accordion type="multiple">
                                                    <AccordionItem value={f.id} className={cn(
                                                        "bg-secondary/50 border !border-b-1 rounded-md overflow-hidden",
                                                        fieldError && "bg-destructive/10 border-destructive"
                                                    )}>
                                                        <section className="relative flex items-center gap-2 px-2">
                                                            <button type="button" className="hover:cursor-grab">
                                                                <GripVertical className="text-muted-foreground" size={16} />
                                                            </button>
                                                            <AccordionTrigger className="text-sm hover:no-underline py-3">
                                                                <section className="flex items-center gap-3">
                                                                    <span className="font-light">{(idx + 1).toString().padStart(2, "0")}</span>
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`sections.${idx}.title`}
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormControl>
                                                                                    <input
                                                                                        maxLength={50}
                                                                                        onClick={(e) => e.stopPropagation()}
                                                                                        className="focus:outline-0 text-sm field-sizing-content"
                                                                                        placeholder="Untitled"
                                                                                        // prevent spacebar from toggling the accordion
                                                                                        onKeyDown={(e) => e.key === ' ' && e.stopPropagation()}
                                                                                        onKeyUp={(e) => {
                                                                                            if (e.key === ' ') {
                                                                                                e.stopPropagation();
                                                                                                e.preventDefault();
                                                                                            }
                                                                                        }}
                                                                                        {...field}
                                                                                    />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </section>
                                                            </AccordionTrigger>
                                                            <section className="absolute right-10">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger className="p-2">
                                                                        <MoreHorizontal size={16} />
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent side="top">
                                                                        {
                                                                            idx !== 0 && <DropdownMenuItem onClick={() => swap(idx, idx - 1)}>
                                                                                <ChevronUp /> Move Up
                                                                            </DropdownMenuItem>
                                                                        }
                                                                        <DropdownMenuItem onClick={() => swap(idx, idx + 1)}>
                                                                            <ChevronDown /> Move Down
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem onClick={() => insert(idx + 1, sectionDefaultValue)}>
                                                                            <Plus /> Add Below
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem onClick={() => insert(idx + 1, field.value)}><Copy /> Duplicate
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem onClick={() => remove(idx)}>
                                                                            <X /> Remove
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </section>
                                                        </section>
                                                        <AccordionContent className="px-3 py-5 bg-background space-y-6">
                                                            <FormField
                                                                control={form.control}
                                                                name={`sections.${idx}.headline`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Headline</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                className='py-5'
                                                                                maxLength={50}
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name={`sections.${idx}.subheadline`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Sub Headline</FormLabel>
                                                                        <FormControl>
                                                                            <Textarea
                                                                                className="field-sizing-content overflow-y-hidden resize-none w-full focus-visible:outline-0"
                                                                                maxLength={300}
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <BlockField sectionIdx={idx} />

                                                            {
                                                                !!field.value.blocks?.items?.length && (
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`sections.${idx}.blocks.direction`}
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>Blocks Direction</FormLabel>
                                                                                <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                                                                    <FormControl>
                                                                                        <SelectTrigger className="w-full py-5">
                                                                                            <SelectValue placeholder={"Select an option"} />
                                                                                        </SelectTrigger>
                                                                                    </FormControl>
                                                                                    <SelectContent>
                                                                                        <SelectItem value={"horizontal"}>Horizontal</SelectItem>
                                                                                        <SelectItem value={"vertical"}>Vertical</SelectItem>
                                                                                    </SelectContent>
                                                                                </Select>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                )
                                                            }

                                                            <FormField
                                                                control={form.control}
                                                                name={`sections.${idx}.container`}
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem className="flex flex-row items-center gap-2">
                                                                            <FormControl>
                                                                                <Checkbox
                                                                                    checked={field.value}
                                                                                    onCheckedChange={(checked) => field.onChange(checked)}
                                                                                />
                                                                            </FormControl>
                                                                            <FormLabel className="text-sm font-normal">
                                                                                Is Container?
                                                                            </FormLabel>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )
                                                                }}
                                                            />

                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                        )
                    })
                }
            </section>
            <Button
                type="button"
                variant={"outline"}
                size={"sm"}
                className="font-normal text-xs"
                onClick={() => append(sectionDefaultValue)}
            >
                <Plus size={16} /> Add Section
            </Button>
        </section>
    )
}

