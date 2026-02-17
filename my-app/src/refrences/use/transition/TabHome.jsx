import { useState, useTransition } from 'react';

function TabHome() {
    const [tab, setTab] = useState('home');
    const [active, setActive] = useState('home');
    const [isPending, startTransition] = useTransition();

    const handleSelect = (next) => {
        setActive(next);
        startTransition(() => {
            setTab(next);
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <button
                onClick={() => handleSelect('home')}
                style={{ background: active === 'home' ? 'blue' : 'gray', color: 'white' }}
            >홈</button>

            <button
                onClick={() => handleSelect('admin')}
                style={{ background: active === 'admin' ? 'red' : 'gray', color: 'white' }}
            >무거운 대시보드</button>

            <p>{isPending ? "⏳ 로딩 중..." : "✅ 준비 완료"}</p>

            <div style={{ opacity: isPending ? 0.3 : 1 }}>
                {tab === 'home' ? <p>홈 화면</p> : <Suspense fallback={<p>🌀 데이터를 처음 불러오는 중...</p>}>
                    <HeavyComponent />
                </Suspense>}
            </div>
        </div>
    );
}

const HeavyComponent = memo(function HeavyComponent() {
    const start = performance.now();
    while (performance.now() - start < 500);

    return <Suspense fallback={<p>🌀 데이터를 처음 불러오는 중...</p>}>
        <p>여기는 아주 무거운 대시보드입니다.</p>
    </Suspense>;
});