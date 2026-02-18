import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    NavLink,
    useParams,
    useSearchParams
} from "react-router-dom";


const navStyle = ({ isActive }) =>
    isActive ? "text-blue-600 font-bold underline" : "text-gray-500 no-underline";

function Layout() {
    return (
        <div className="p-4">
            <nav className="flex gap-4 mb-8 border-b pb-2">
                <NavLink to="/" className={navStyle} end>Home</NavLink>
                <NavLink to="/dashboard" className={navStyle}>Dashboard</NavLink>
            </nav>
            <Outlet />
        </div>
    );
}

function Dashboard() {
    return (
        <div className="p-4 bg-gray-50 rounded">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <nav className="flex gap-3 my-4">
                <NavLink to="profile/jdoe" className={navStyle}>Profile (jdoe)</NavLink>
                <NavLink to="settings?theme=dark" className={navStyle}>Settings (Dark)</NavLink>
            </nav>
            <div className="mt-4 p-2 border-l-4 border-blue-400 bg-white">
                <Outlet />
            </div>
        </div>
    );
}

function Profile() {
    const { username } = useParams();
    return <div>User Profile Page for: <strong>{username}</strong></div>;
}

function Settings() {
    const [searchParams, setSearchParams] = useSearchParams();
    const theme = searchParams.get("theme") || "light";

    return (
        <div>
            <p>Account Settings Page (Current Theme: {theme})</p>
            <button
                onClick={() => setSearchParams({ theme: 'light' })}
                className="mr-2 border px-2 text-sm"
            >
                Set Light
            </button>
            <button
                onClick={() => setSearchParams({ theme: 'dark' })}
                className="border px-2 text-sm"
            >
                Set Dark
            </button>
        </div>
    );
}


// useLoaderData도 잘 써보도록(유저가 데이터 오는 동안 다른 데로 갔을 때 abort처리 잊지 말고, 에러 바운더리도 생각해라).
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <div>Welcome Home!</div> },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    { index: true, element: <div>Select a menu above.</div> },
                    { path: "profile/:username", element: <Profile /> },
                    { path: "settings", element: <Settings /> },
                ],
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}