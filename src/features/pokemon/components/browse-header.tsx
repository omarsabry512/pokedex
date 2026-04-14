import { LightningBoltIcon } from "@/features/pokemon/components/lightning-bolt-icon";

export type BrowseMode = "page-controls" | "infinite-scroll";

const SUBTITLES: Record<BrowseMode, string> = {
    "page-controls": "Discover and explore Pokémon with page controls.",
    "infinite-scroll": "Discover and explore Pokémon with infinite scroll.",
};

type BrowseHeaderProps = {
    mode: BrowseMode;
};

export function BrowseHeader({ mode }: BrowseHeaderProps) {
    return (
        <header className="text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
                <LightningBoltIcon className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-[2.5rem] sm:leading-tight">
                    Pokédex
                </h1>
            </div>
            <p className="mx-auto mt-3 max-w-lg px-2 text-sm leading-relaxed text-zinc-500 sm:mt-4 sm:text-base">
                {SUBTITLES[mode]}
            </p>
        </header>
    );
}
