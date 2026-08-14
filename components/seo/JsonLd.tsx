/**
 * Structured data via a native <script> tag — this is Next.js's own current
 * documented pattern (node_modules/next/dist/docs/01-app/02-guides/json-ld.md):
 * "a native <script> tag is the right choice here" over next/script, which
 * is for loading/executing JS, not inert JSON-LD data. A Server Component,
 * never "use client" — it must only ever be part of the server-rendered
 * output, never something the client re-creates via createElement.
 *
 * The `<` escape matches Next's own docs example, to prevent the JSON
 * payload from being able to break out of the script tag with `</script>`.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
