import { Link } from "react-router";
import type { PokemonDetail } from "@/features/pokemon/services/types";

type PokemonDetailViewProps = {
    pokemon: PokemonDetail;
};

const STAT_MAX = 255;

const TYPE_CHIP_CLASS: Record<string, string> = {
    normal: "bg-stone-500 text-white",
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    electric: "bg-yellow-400 text-yellow-950",
    grass: "bg-green-600 text-white",
    ice: "bg-sky-400 text-sky-950",
    fighting: "bg-orange-700 text-white",
    poison: "bg-purple-600 text-white",
    ground: "bg-amber-700 text-white",
    flying: "bg-indigo-400 text-indigo-950",
    psychic: "bg-fuchsia-600 text-white",
    bug: "bg-lime-600 text-white",
    rock: "bg-amber-800 text-white",
    ghost: "bg-violet-700 text-white",
    dragon: "bg-indigo-700 text-white",
    dark: "bg-zinc-800 text-white",
    steel: "bg-slate-500 text-white",
    fairy: "bg-pink-500 text-white",
};

function formatDexId(id: string): string {
    return id.padStart(3, "0");
}

function RulerIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="text-zinc-500"
            aria-hidden
        >
            <path
                fill="currentColor"
                d="M3 6h18v2H3V6zm0 5h12v2H3v-2zm0 5h18v2H3v-2z"
            />
        </svg>
    );
}

function ScaleIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="text-zinc-500"
            aria-hidden
        >
            <path
                fill="currentColor"
                d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 2a7 7 0 110 14 7 7 0 010-14zm-1 3h2v5h3v2H9v-7z"
            />
        </svg>
    );
}

export function PokemonDetailView({ pokemon }: PokemonDetailViewProps) {
    const displayName = pokemon.name.replace(/-/g, " ");
    const heightM = pokemon.heightDm / 10;
    const weightKg = pokemon.weightHg / 10;
    const visibleAbilities = pokemon.abilities.filter((a) => !a.isHidden);
    const hiddenAbilities = pokemon.abilities.filter((a) => a.isHidden);

    return (
        <div className="mx-auto max-w-[900px]">
            <Link
                to="/browse/page-controls"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
            >
                <span aria-hidden>←</span> Back to List
            </Link>

            <article className="mt-6 overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.1)] ring-1 ring-zinc-900/5">
                <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 px-6 py-8 text-center sm:px-10 sm:py-10">
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        <span
                            className="mr-1.5 inline-block text-white/90"
                            aria-hidden
                        >
                            {"\u2726"}
                        </span>
                        <span className="capitalize">{displayName}</span>
                    </h1>
                    <p className="mt-2 text-sm font-medium text-white/85">
                        #{formatDexId(pokemon.id)}
                    </p>
                </div>

                <div className="grid gap-8 p-6 sm:grid-cols-2 sm:gap-10 sm:p-10">
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="flex h-48 w-48 items-center justify-center rounded-full bg-[#F3F4F6] ring-4 ring-white sm:h-56 sm:w-56">
                            {pokemon.spriteUrl ? (
                                <img
                                    src={pokemon.spriteUrl}
                                    alt=""
                                    className="max-h-[85%] max-w-[85%] object-contain"
                                />
                            ) : (
                                <span className="text-zinc-400">
                                    No artwork
                                </span>
                            )}
                        </div>

                        {pokemon.types.length > 0 ? (
                            <ul className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                                {pokemon.types.map((t) => (
                                    <li key={t}>
                                        <span
                                            className={`inline-flex rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide shadow-sm ${TYPE_CHIP_CLASS[t] ?? "bg-zinc-700 text-white"}`}
                                        >
                                            {t}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : null}

                        <div className="mt-6 w-full max-w-sm rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center sm:text-left">
                                    <div className="flex items-center justify-center gap-1.5 sm:justify-start">
                                        <RulerIcon />
                                        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                            Height
                                        </span>
                                    </div>
                                    <p className="mt-1.5 text-lg font-bold text-zinc-900">
                                        {heightM} m
                                    </p>
                                </div>
                                <div className="text-center sm:text-left">
                                    <div className="flex items-center justify-center gap-1.5 sm:justify-start">
                                        <ScaleIcon />
                                        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                            Weight
                                        </span>
                                    </div>
                                    <p className="mt-1.5 text-lg font-bold text-zinc-900">
                                        {weightKg} kg
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-zinc-900">
                            Base Stats
                        </h2>
                        <ul className="mt-4 space-y-3">
                            {pokemon.stats.map((s) => (
                                <li
                                    key={s.key}
                                    className="grid grid-cols-[1fr_minmax(0,1fr)_2.5rem] items-center gap-3"
                                >
                                    <span className="text-sm font-medium text-zinc-600">
                                        {s.label}
                                    </span>
                                    <div className="h-2.5 overflow-hidden rounded-full bg-zinc-200">
                                        <div
                                            className="h-full rounded-full bg-zinc-700"
                                            style={{
                                                width: `${Math.min(100, (s.base / STAT_MAX) * 100)}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="text-right text-sm font-semibold tabular-nums text-zinc-900">
                                        {s.base}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-100 px-6 pb-8 pt-2 sm:px-10 sm:pb-10">
                    <h2 className="text-lg font-bold text-zinc-900">
                        Abilities
                    </h2>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        {visibleAbilities.map((a) => (
                            <span
                                key={a.name}
                                className="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-sm font-medium capitalize text-zinc-800"
                            >
                                {a.name}
                            </span>
                        ))}
                        {hiddenAbilities.map((a) => (
                            <span
                                key={`${a.name}-hidden`}
                                className="text-sm font-medium capitalize text-zinc-500"
                            >
                                {a.name}{" "}
                                <span className="text-zinc-400">(Hidden)</span>
                            </span>
                        ))}
                    </div>

                    <h2 className="mt-8 text-lg font-bold text-zinc-900">
                        Base Experience
                    </h2>
                    <p className="mt-3 text-2xl font-bold text-sky-600">
                        {pokemon.baseExperience} XP
                    </p>
                </div>
            </article>
        </div>
    );
}
