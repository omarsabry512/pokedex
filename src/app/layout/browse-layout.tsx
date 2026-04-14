import { Outlet, useLocation } from "react-router";
import type { BrowseMode } from "@/features/pokemon/components/browse-header";
import { BrowseHeader } from "@/features/pokemon/components/browse-header";
import { ControlTabs } from "@/features/pokemon/components/control-tabs";

function browseModeFromPath(pathname: string): BrowseMode {
    return pathname.includes("infinite-scroll")
        ? "infinite-scroll"
        : "page-controls";
}

export function BrowseLayout() {
    const { pathname } = useLocation();
    const mode = browseModeFromPath(pathname);
    const surface =
        mode === "infinite-scroll" ? "bg-[#E8F8EE]" : "bg-[#F0F3FF]";

    return (
        <div
            className={`min-h-dvh font-sans text-zinc-900 antialiased ${surface} transition-[background-color] duration-300`}
        >
            <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-12">
                <BrowseHeader mode={mode} />
                <div className="mt-8 flex justify-center sm:mt-10">
                    <ControlTabs />
                </div>
                <div className="mt-10 sm:mt-12">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
