import { useSession } from "next-auth/react";
import Videos from "./Videos"

function Feed() {
    const {data: session} = useSession();
    return (
        <main className={`grid grid-cols-1 md:grid-cols-1 md:max-w-3xl xl:grid-cols-1 xl:max-w-6xl mx-auto`}>
            <section className="col-span-2">
                <Videos />
            </section>
        </main>
    )
}

export default Feed
