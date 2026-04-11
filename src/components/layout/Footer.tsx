export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sticky bottom-0 z-50 w-full border-t border-border/40 bg-background/80 backdrop-blur-md py-4">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="hidden md:block text-sm text-muted-foreground font-medium text-center md:text-right">
          &copy; {currentYear}{" "}
          <span className="text-foreground font-semibold">
            Ashutec Solutions Pvt. Ltd.
          </span>
        </p>

        <div className="flex items-center justify-center w-full md:w-auto gap-2">
          <span className="text-sm font-medium text-muted-foreground font-outfit">
            PokéDex Explorer
          </span>
        </div>
      </div>
    </footer>
  );
}
