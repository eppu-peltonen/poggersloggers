import type { PageRoute } from "./models/Interfaces";
import {Route1, Route2} from "./components/Bryitt"

export const routes: PageRoute[] = [
    {
        name: "Route1",
        url: "/route1",
        component: <Route1 />
    },
    {
        name: "Route2",
        url: "/route2",
        component: <Route2 />
    }
];