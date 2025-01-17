import * as React from "react"
import { getHello } from "./services/hello"
import { useQuery } from "@tanstack/react-query"
import Header from "./components/Header"

const App = () => {

    const {isPending, error, data, isFetching} = useQuery({
        queryKey: ["hello"],
        queryFn: getHello,
    });

        if (isPending) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <Header />
            <div className="container mx-auto p-4 bg-slate-200 shadow-lg rounded-lg">
                {data.message}
                <div>{isFetching ? "Fetching..." : ""}</div>
            </div>
        </div>
    )
}

export default App
