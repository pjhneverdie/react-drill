import { useState, useMemo } from 'react';

function FilteredList({ items }) {
    const [query, setQuery] = useState("");
    const [count, setCount] = useState(0);

    const filteredItems = useMemo(() => {
        return items.filter(item =>
            item.toLowerCase().includes(query.toLowerCase())
        );
    }, [items, query]); // items, query가 바뀌는 게 아니면 연산이 일어나지 않음. 이전 결과를 바로 반환함.
    // 리엑트가 컴포넌트의 바뀐 부분만 다시 그리는 건 맞는데 함수 연산은 처음부터 다시함.ㅜㅠ 까먹지 마시고.


    return (
        <div>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색어 입력"
            />
            <button onClick={() => setCount(count + 1)}>
                단순 카운트 증가: {count}
            </button>
            <ul>
                {filteredItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}