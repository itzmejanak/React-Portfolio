import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageBanner } from "@/components/site/SectionHeading";
import { Skeleton, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { collectionQuery, type PdfItem } from "@/lib/portfolio";

const title = "Free E-Books & PDFs — Janak Devkota";
const description =
  "A free library of programming, Linux and development PDFs and e-books collected by Janak Devkota.";

export const Route = createFileRoute("/e-books")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EBooksPage,
});

function EBooksPage() {
  const { data: books = [], isLoading } = useQuery(collectionQuery<PdfItem>("pdfData"));

  return (
    <>
      <PageBanner eyebrow={`Library — ${books.length} titles`} title="Free e-books & PDFs" description="Guides on Linux, programming and development — all free to download." scene="books" />
    <section className="mx-auto max-w-6xl px-6 py-16">
      {isLoading ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[0,1,2,3,4,5].map((i) => <Skeleton key={i} className="h-60" />)}</div> : null}
      <Stagger className="editorial-index grid gap-x-12 md:grid-cols-2">
        {books.map((book, index) => (
          <StaggerItem key={book.itemName} className="editorial-index-item flex gap-5 py-6">
            <img
              src={book.imgSrc}
              alt={book.altText ?? book.itemName}
              loading="lazy"
              className="h-32 w-24 shrink-0 bg-background object-cover"
            />
            <div className="min-w-0"><span className="font-mono text-[10px] text-ember">{String(index + 1).padStart(2, "0")}</span>
              {book.discount ? (
                <p className="font-mono text-[10px] uppercase tracking-wider text-ember">
                  {book.discount}
                </p>
              ) : null}
              <h2 className="mt-2 font-display text-lg font-semibold text-foreground">
                {book.itemName}
              </h2>
              <div className="mt-2 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <span className="text-foreground">{book.newPrice ?? "Free"}</span>
                {book.oldPrice && book.oldPrice !== "N/A" ? (
                  <span className="line-through">{book.oldPrice}</span>
                ) : null}
              </div>
              {book.downloadLink ? (
                <a
                  href={book.downloadLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block font-mono text-[11px] uppercase tracking-wider text-ember hover:underline"
                >
                  Download →
                </a>
              ) : null}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
    </>
  );
}
