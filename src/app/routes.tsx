import { Navigate, Route, Routes } from "react-router";
import { BrowseLayout } from "@/app/layout/browse-layout";
import { PokemonDetailPage } from "@/features/pokemon/pages/pokemon-detail-page";
import { PokemonListLoadMorePage } from "@/features/pokemon/pages/pokemon-list-load-more-page";
import { PokemonListPaginationPage } from "@/features/pokemon/pages/pokemon-list-pagination-page";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<BrowseLayout />}>
                <Route
                    index
                    element={<Navigate to="page-controls" replace />}
                />
                <Route
                    path="page-controls"
                    element={<PokemonListPaginationPage />}
                />
                <Route
                    path="infinite-scroll"
                    element={<PokemonListLoadMorePage />}
                />
            </Route>
            <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
            <Route
                path="/pagination"
                element={<Navigate to="/browse/page-controls" replace />}
            />
            <Route
                path="/load-more"
                element={<Navigate to="/browse/infinite-scroll" replace />}
            />
            <Route
                path="*"
                element={<Navigate to="/browse/page-controls" replace />}
            />
        </Routes>
    );
}
