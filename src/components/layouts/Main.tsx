import { Outlet } from "react-router-dom"

export default function Main() {
    return (
        <main>
            <div className="container">
                <Outlet />
            </div>
        </main>
    )
}
