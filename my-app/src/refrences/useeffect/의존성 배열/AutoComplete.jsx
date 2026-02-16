import { useState, useEffect } from 'react';
import axios from 'axios';

const Autocomplete = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setResults([]);
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: { q: searchTerm },
                    signal: controller.signal 
                });

                setResults(response.data.slice(0, 5));
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('이전 요청이 취소되었습니다:', error.message);
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
    }, [searchTerm]); // 의존성 배열 의존 상태가 바뀔 때마다 실행.

    return (
        <div style={{ padding: '20px', maxWidth: '400px' }}>
            <h2>AI 아카이브: Axios 검색</h2>
            <input
                type="text"
                placeholder="글 제목을 입력하세요 (예: sunt)..."
                style={{ width: '100%', padding: '10px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading && <p style={{ color: 'blue' }}>데이터를 불러오는 중...</p>}

            {!loading && results.length > 0 && (
                <ul style={{ marginTop: '10px', border: '1px solid #ddd', padding: '10px', listStyle: 'none' }}>
                    {results.map((item) => (
                        <li key={item.id} style={{ marginBottom: '8px', borderBottom: '1px solid #eee' }}>
                            <strong>{item.title}</strong>
                        </li>
                    ))}
                </ul>
            )}
            {!loading && searchTerm && results.length === 0 && <p>검색 결과가 없습니다.</p>}
        </div>
    );
};