import { cn } from "@/lib/utils";
import { RenderHeroProps } from "../render-hero";
import { EHeroLayoutTypes } from "../../../../../types/page.types";
import { EAlignment } from "../../../../../types/global.types";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import CMSLink from "@/components/ui/cms-link";

export default function JumboTron({ hero }: RenderHeroProps) {
  const layoutType = hero.layout.type;
  if (layoutType !== EHeroLayoutTypes.Jumbotron) return null;

  const alignment = hero.layout.alignment;

  return (
    <section
      className={cn(
        "h-[80vh] max-h-[600px] xl:p-20 lg:p-16 p-10 flex flex-col items-center mb-12",
        alignment === EAlignment.Left
          ? "justify-start"
          : alignment === EAlignment.Center
            ? "justify-center"
            : "justify-end"
      )}
      style={{
        background: hero.image?.secure_url
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero.image.secure_url}) no-repeat center center / cover`
          : undefined
      }}
    >
      <RichTextPreview className="mb-6" html={hero.headline.html} />
      {
        Array.isArray(hero.cta) && hero.cta.length > 0 && (
          <ul className="flex md:justify-center gap-4">
            {hero.cta.map((cta, index) => (
              <li key={index}>
                <CMSLink size={'lg'} {...cta} />
              </li>
            ))}
          </ul>
        )
      }
    </section>
  )
}