import { NavLink } from "react-router";

const tabClass = ({ isActive }: { isActive: boolean }) =>
    [
        "min-w-[148px] rounded-full border px-5 py-2.5 text-center text-sm font-semibold transition-colors duration-200 sm:min-w-[168px] sm:px-7 sm:text-[15px]",
        isActive
            ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
            : "border-zinc-300 bg-white text-zinc-900 hover:border-zinc-400",
    ].join(" ");

export function ControlTabs() {
    return (
        <nav
            className="inline-flex flex-wrap justify-center gap-2 sm:gap-3"
            aria-label="Pokémon list mode"
        >
            <NavLink to="/page-controls" className={tabClass} end={false}>
                Page Controls
            </NavLink>
            <NavLink to="/infinite-scroll" className={tabClass}>
                Infinite Scroll
            </NavLink>
        </nav>
    );
}
