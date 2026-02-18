import { BrowserRouter, Routes, Route, NavLink, Outlet } from "react-router-dom";

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
            <h2>Dashboard</h2>
            <nav className="flex gap-3 my-4">
                <NavLink to="profile" className={navStyle}>Profile</NavLink>
                <NavLink to="settings" className={navStyle}>Settings</NavLink>
            </nav>
            <div className="mt-4 p-2 border-l-4 border-blue-400 bg-white">
                <Outlet />
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}> {/* 인덱스 페이지 경로 '/', 컴포넌트 <Layout />. */}
                    {/* 여기서부터는 하위 경로에서 부모 컴포넌트의 <Outlet />에 어떤 컴포넌트를 매치시킬지 결정하는 거임. */}
                    <Route index element={<div>Welcome Home!</div>} /> {/* index 속성을 붙이면 부모 라우트랑 정확히 일치할 때 매치시킴 */}

                    <Route path="dashboard" element={<Dashboard />}>
                        <Route index element={<div>Select a menu above.</div>} />
                        <Route path="profile" element={<div>User Profile Page</div>} />
                        <Route path="settings" element={<div>Account Settings Page</div>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}