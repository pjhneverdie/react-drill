import { useState, useDeferredValue, useMemo, memo } from 'react';

const SearchResults = memo(({ items }) => {
    return (
        <ul>
            {items.map(item => <li key={item.id}>{item.text}</li>)}
        </ul>
    );
});

const SearchDashboard = () => {
    const [query, setQuery] = useState("");
    const [rawData, setRawData] = useState([]);

    const deferredQuery = useDeferredValue(query);

    const filteredData = useMemo(() => {
        return rawData.filter(item => item.text.includes(deferredQuery));
    }, [rawData, deferredQuery]);

    const isStale = query !== deferredQuery;

    return (
        <div>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색어를 입력하세요..."
            />

            <div style={{ opacity: isStale ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                <SearchResults items={filteredData} />
            </div>
        </div>
    );
};