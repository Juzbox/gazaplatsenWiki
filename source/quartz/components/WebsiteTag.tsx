import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const WebsiteTag: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const website = fileData.frontmatter?.website
  const baseDir = pathToRoot(fileData.slug!)

  if (website) {
    return (
      <ul class={classNames(displayClass, "tags")}>
        <li>
          <a href={website} class="internal tag-link" target="_blank" rel="noopener noreferrer">
            Visit Website
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
  text-decoration: none;
  font-weight: 500;
}
`

export default (() => WebsiteTag) satisfies QuartzComponentConstructor
