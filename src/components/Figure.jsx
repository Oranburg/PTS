// House figure component for React + Vite sites (BA reader, future React projects).
//
// Usage:
//   import Figure from "@/components/Figure";
//   <Figure name="lineage-flowchart" alt="..." caption="..." />
//
// Looks for SVG primary at /figures/web/<name>.svg with PNG fallback at
// /figures/web/<name>.png — both produced by `lawj graphics render`.
//
// Place rendered figures under public/figures/web/ so Vite serves them at
// /figures/web/<name>.{svg,png}.

export default function Figure({ name, alt, caption, className = "" }) {
  const base = `/figures/web/${name}`;
  return (
    <figure
      className={`og-figure ${className}`.trim()}
      role="figure"
      aria-label={alt}
      style={{ margin: "1.5em 0", textAlign: "center" }}
    >
      <picture>
        <source srcSet={`${base}.svg`} type="image/svg+xml" />
        <img
          src={`${base}.png`}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </picture>
      {caption && (
        <figcaption
          style={{
            marginTop: "0.5em",
            fontFamily: "var(--og-font-serif, Georgia, serif)",
            fontSize: "0.9em",
            color: "var(--og-ink-muted, #4A4A4A)",
            fontStyle: "italic",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
