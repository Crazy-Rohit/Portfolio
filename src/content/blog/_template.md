---
title: "Your Post Title Here"
date: "2026-01-01"
tags: ["Tag One", "Tag Two"]
excerpt: "A one-two sentence summary — shown on the blog list page, so make it count."
coverImage: "/images/blog/your-post-slug/cover.png"
---

Write your opening paragraph here. This is what pulls a reader in.

## A Section Heading

Regular paragraph text goes here. Use `##` for section headings and `###` for
sub-sections, same as any markdown file.

### Adding an image inside the post

![A short description of what this image shows](/images/blog/your-post-slug/diagram.png)

The alt text above (`A short description...`) automatically becomes a caption
shown under the image.

### Adding a downloadable PDF or document

[Read the full research paper (PDF)](/documents/blog/your-post-slug/paper.pdf)

Any link ending in `.pdf`, `.doc`, `.docx`, `.ppt`, `.pptx`, `.xls`, `.xlsx`,
or `.zip` automatically renders as a styled download card instead of a plain
text link — no special syntax needed, just link to the file normally.

### A regular external link

[Read more about this topic](https://example.com)

---

## HOW TO USE THIS TEMPLATE (delete this section before publishing)

1. Copy this file and rename it, e.g. `src/content/blog/my-new-post.md` — the
   filename becomes the URL slug (`/blog/my-new-post`). Don't use spaces;
   use hyphens.
2. Fill in the frontmatter block at the very top (title, date, tags, excerpt,
   coverImage).
3. Put any images this post uses in `public/images/blog/<your-slug>/` and
   reference them as `/images/blog/<your-slug>/filename.png`.
4. Put any PDFs or documents in `public/documents/blog/<your-slug>/` and link
   them as `/documents/blog/<your-slug>/filename.pdf`.
5. Delete this "HOW TO USE" section — it's just for reference, not part of
   the published post.
6. Save the file. It shows up on `/blog` automatically — no code changes,
   no rebuild step to remember, nothing else to touch.
