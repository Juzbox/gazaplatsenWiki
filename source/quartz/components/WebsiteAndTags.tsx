import { pathToRoot, slugTag } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const WebsiteAndTags: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
  const website = fileData.frontmatter?.website
  const baseDir = pathToRoot(fileData.slug!)

  if ((tags && tags.length > 0) || website) {
    return (
      <ul class={classNames(displayClass, "tags")}>
        {tags?.map((tag) => {
          const linkDest = baseDir + `/tags/${slugTag(tag)}`
          return (
            <li>
              <a href={linkDest} class="internal tag-link">
                {tag}
              </a>
            </li>
          )
        })}

        {website && (
          <li>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              class="external website-link"
            >
              {new URL(website).hostname}
            </a>
          </li>
        )}
      </ul>
    )
  } else {
    return null
  }
}

WebsiteAndTags.css = `
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

a.internal.tag-link,
a.external.website-link {
  border-radius: 8px;
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
  text-decoration: none;
  color: white;
}

a.internal.tag-link {
  background-color: var(--highlight);
}

a.external.website-link {
  background-color: var(--accent);
}
`

export default (() => WebsiteAndTags) satisfies QuartzComponentConstructor
