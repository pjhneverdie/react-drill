import { useState, useEffect, useRef } from "react";

function AdvancedDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div style={{ padding: '100px', textAlign: 'center' }}>
            <div
                ref={dropdownRef}
                style={{ position: 'relative', display: 'inline-block' }}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                >
                    계정 설정 ⚙️
                </button>

                {isOpen && (
                    <div style={{
                        position: 'absolute', top: '45px', left: '0', width: '200px',
                        backgroundColor: 'white', border: '1px solid #ddd',
                        borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        zIndex: 10, textAlign: 'left', padding: '10px'
                    }}>
                        <div style={{ padding: '10px', cursor: 'pointer' }}>내 프로필</div>
                        <div style={{ padding: '10px', cursor: 'pointer' }}>결제 수단</div>
                        <div style={{ padding: '10px', cursor: 'pointer', color: 'red' }}>로그아웃</div>
                    </div>
                )}
            </div>
        </div>
    );
}