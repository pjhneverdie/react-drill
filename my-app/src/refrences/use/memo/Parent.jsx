import React, { useState, useCallback } from 'react';

const ChildButton = React.memo(({ onClick }) => {
    return <button onClick={onClick}>클릭하세요</button>;
}); // 아무데나 쓰면 안 된다. devtools 프로파일러 써서 확인해봐

function Parent() {
    const [count, setCount] = useState(0);

    const handleClick = useCallback(() => {
        console.log("버튼 클릭됨");
    }, []);

    return (
        <div>
            <h1>카운트: {count}</h1>
            <button onClick={() => setCount(count + 1)}>숫자 증가</button>

            <ChildButton onClick={handleClick} />
        </div>
    );
}