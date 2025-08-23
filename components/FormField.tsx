import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from "@/components/ui/input"
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
    control: Control<T> // Replace 'any' with the actual type of your control
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'file'
    autoComplete?: string;
}


function FormField<T extends FieldValues>({control, name, label, placeholder, type = "text", autoComplete}: FormFieldProps<T>) {
    return (
        <Controller name={name} control={control} render={({ field }) => {
            // Remove 'type' from field to avoid overriding the explicit type prop
            const { type: _type, ...fieldProps } = field as any;
            return (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input className='input' placeholder={placeholder} {...fieldProps} type={type} autoComplete={autoComplete}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )
        }}
        />
    );
}

export default FormField
