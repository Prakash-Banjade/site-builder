import { cn } from "@/lib/utils";

type Props = {
    className?: string
    html: string
}

const emptyNodes = [
    `<p class="leading-7"><br></p>`,
    `<p class="leading-7" style="text-align: start;"><br></p>`,
    `<p><br></p>`,
    `<p></p>`,
]

/**
 * Checks if the HTML is empty
 */
function isEmptyHTML(html: string) {
    return !html || emptyNodes.includes(html?.trim());
}

export function RichTextPreview({ className, html }: Props) {
    if (isEmptyHTML(html)) return null;

    return (
        <div className={cn("rich_text", className)} dangerouslySetInnerHTML={{ __html: html }} />
    )
}