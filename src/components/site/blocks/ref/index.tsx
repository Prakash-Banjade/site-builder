import { RefItemBlockDto } from "@/schemas/page.schema";
import BlogsBlock from "./blogs-block";
import { ERefRelation } from "../../../../../types/blocks.types";

export default function RenderRefItems(props: RefItemBlockDto) {
    return props.refRelation === ERefRelation.Blogs
        ? <BlogsBlock {...props} refRelation={props.refRelation} />
        : null
}