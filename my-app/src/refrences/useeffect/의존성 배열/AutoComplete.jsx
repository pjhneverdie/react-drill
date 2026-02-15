import React, { useState, useEffect } from 'react';

const Autocomplete = () => {
    const [searchTerm, setSearchTerm] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!searchTerm) {
            setResults([]);
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                console.log(`${searchTerm} 검색 중...`);

                const mockData = ["apple", "banana", "cherry", "date"].filter(item =>
                    item.includes(searchTerm.toLowerCase())
                );

                setResults(mockData);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('이전 요청이 취소되었습니다.');
                } else {
                    console.error("검색 에러:", error);
                }
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => {
            clearTimeout(delayDebounceFn);
            controller.abort();
        };
    }, [searchTerm]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>AI 아카이브: 자동완성 검색</h2>
            <input
                type="text"
                placeholder="과일 이름을 입력하세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading && <p>찾는 중...</p>}

            <ul>
                {results.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};