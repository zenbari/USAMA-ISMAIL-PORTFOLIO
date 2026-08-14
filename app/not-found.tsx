import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center py-24">
      <Container className="max-w-xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">404</p>
        <h1 className="mt-4 font-display text-display-2 text-fg">
          This page didn&rsquo;t make the audit.
        </h1>
        <p className="mt-4 text-body-lg text-fg-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/work" variant="secondary">
            View work
          </Button>
        </div>
      </Container>
    </div>
  );
}
