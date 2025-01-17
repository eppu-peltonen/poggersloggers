import { getHello } from "../services/hello"
import { useQuery } from "@tanstack/react-query"

export const Bryitt = () => {

    const {isPending, error, data, isFetching} = useQuery({
        queryKey: ["hello"],
        queryFn: getHello,
    });
    
    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container mx-auto p-4 bg-slate-200 shadow-lg rounded-lg">
            {data.message}
            <div>{isFetching ? "Fetching..." : ""}</div>
        </div>
    )
}

export const Route1 = () => {
    return (
        <div>
            <h1>Route 1</h1>
        </div>
    )
}

export const Route2 = () => {
    return (
        <div>
            <h1>Route 2</h1>
        </div>
    )
}
