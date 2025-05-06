import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const WebsiteTag: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const website = fileData.frontmatter?.Website

  if (website) {
    // Remove fragment/hash (#...) from the display text, but keep the full URL for href
    const displayText = website.split("#")[0]

    return (
      <ul class={classNames(displayClass, "tags")}>
        <li>
          <a href={website} class="internal tag-link" target="_blank" rel="noopener noreferrer">
            {displayText}
          </a>
        </li>
      </ul>
    )
  } else {
    return null
  }
}

WebsiteTag.css = `
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 1rem 0;
  flex-wrap: wrap;
  justify-self: end;
}

.section-li > .section > .tags {
  justify-content: flex-end;
}
  
.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}
`

export default (() => WebsiteTag) satisfies QuartzComponentConstructor
