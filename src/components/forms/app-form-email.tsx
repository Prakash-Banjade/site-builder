import { FieldValues, useFormContext } from "react-hook-form";
import { AppFormInputProps } from "./app-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export function AppFormEmail<T extends FieldValues>({
    name,
    label,
    placeholder = '',
    description = '',
    required = false,
    inputClassName = '',
    containerClassName = '',
    ...props
}: AppFormInputProps<T>) {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name as string}
            render={({ field }) => (
                <FormItem className={containerClassName}>
                    <FormLabel>
                        {label}
                        {required && <span className="text-destructive">*</span>}
                    </FormLabel>
                    <FormControl>
                        <Input type="email" className={inputClassName} placeholder={placeholder} {...field} value={field.value ?? undefined} required={required} {...props} />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};