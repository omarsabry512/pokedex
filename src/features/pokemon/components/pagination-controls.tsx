import { buildPaginationItems } from "@/features/pokemon/services/build-pagination-items";
import { POKEMON_PAGE_SIZE } from "@/shared/config/pagination";

type PaginationControlsProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
    pageSize?: number;
};

export function PaginationControls({
    page,
    totalPages,
    onPageChange,
    disabled,
    pageSize = POKEMON_PAGE_SIZE,
}: PaginationControlsProps) {
    const items = buildPaginationItems(page, totalPages);

    return (
        <nav
            className="flex flex-col items-center gap-4 pt-4"
            aria-label="Pagination"
        >
            <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                    type="button"
                    disabled={disabled || page <= 1}
                    onClick={() => onPageChange(page - 1)}
                    className="rounded-lg bg-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm transition enabled:hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-45"
                >
                    &lt; Previous
                </button>

                <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {items.map((item, i) =>
                        item === "ellipsis" ? (
                            <span
                                key={`e-${i}`}
                                className="px-1.5 text-sm font-medium text-zinc-500"
                                aria-hidden
                            >
                                …
                            </span>
                        ) : (
                            <button
                                key={item}
                                type="button"
                                disabled={disabled}
                                onClick={() => onPageChange(item)}
                                aria-current={
                                    item === page ? "page" : undefined
                                }
                                className={
                                    item === page
                                        ? "min-h-9 min-w-9 rounded-lg bg-zinc-900 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm"
                                        : "min-h-9 min-w-9 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-sm font-medium text-zinc-900 shadow-sm transition hover:border-zinc-300 disabled:opacity-45"
                                }
                            >
                                {item}
                            </button>
                        ),
                    )}
                </div>

                <button
                    type="button"
                    disabled={disabled || page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="rounded-lg bg-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm transition enabled:hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-45"
                >
                    Next &gt;
                </button>
            </div>

            <p className="text-center text-sm text-zinc-500">
                Page {page} of {totalPages} ({pageSize} Pokémon shown)
            </p>
        </nav>
    );
}
