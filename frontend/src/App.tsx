import { useState } from "react"
import "./App.css"
import { getHello } from "./services/hello"
import { useQuery } from "@tanstack/react-query"

function App() {
    const [count, setCount] = useState(0)

    const {isPending, error, data, isFetching} = useQuery({
        queryKey: ["hello"],
        queryFn: getHello,
    });

        if (isPending) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <h1>Vite + React</h1>
            <div>{data.message}</div>
            <div>{isFetching ? "Fetching..." : ""}</div>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
