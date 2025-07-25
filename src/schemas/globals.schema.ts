import { z } from 'zod';
import { ELinkType } from '../../types/global.types';
import { ECtaVariant } from '../../types/blocks.types';

export const MAX_NAV_LINKS = 10;
export const MAX_NAV_SUB_LINKS = 20;

const linkSchema = z.object({
    text: z
        .string()
        .min(3, { message: 'Name must be between 3 and 20 characters' })
        .max(20, { message: 'Name must be between 3 and 20 characters' })
        .transform((val) => val.trim()),

    url: z
        .string()
        .min(3, { message: 'URL must be between 3 and 200 characters' })
        .max(200, { message: 'URL must be between 3 and 200 characters' })
        .transform((val) => val.trim()),

    type: z.nativeEnum(ELinkType),

    variant: z.nativeEnum(ECtaVariant),

    newTab: z.boolean(),
})

export const navLinkSchema = z.object({
    ...linkSchema.shape,
    subLinks: z
        .array(linkSchema)
        .max(MAX_NAV_SUB_LINKS, { message: `Sublinks must be less than ${MAX_NAV_SUB_LINKS}` }),

}).refine((data) => {
    // If external link, validate URL format
    if (data.type === ELinkType.External) {
        return z.string().url().safeParse(data.url).success;
    }
    return true;
}, { message: 'Invalid URL for external link', path: ['url'] });

export const navLinksSchema = z
    .array(navLinkSchema, { invalid_type_error: 'Nav links must be an array' })
    .max(MAX_NAV_LINKS, { message: `Nav links must be less than ${MAX_NAV_LINKS}` });

export type TNavLinksDto = z.infer<typeof navLinksSchema>;

export const headerSchema = z.object({
    navLinks: navLinksSchema,
});

export type THeaderDto = z.infer<typeof headerSchema>;

// ------------------------------------------------------------------>

export const footerSchema = z.object({
    navLinks: navLinksSchema,
    footerText: z
        .string()
        .max(500, { message: 'Footer text must be less than 500 characters' })
        .optional(),
});

export type TFooterDto = z.infer<typeof footerSchema>;