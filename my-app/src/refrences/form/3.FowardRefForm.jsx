import { useRef } from 'react';

const NameField = ({ ref, ...props }) => {
    return (
        <input
            ref={ref}
            placeholder="이름을 입력하세요"
            {...props /** 이름만 맞으면 속성에 props 그대로 전달할 수 있음. */}
        />
    );
};

function Form() {
    const formRef = useRef({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: formRef.current.name?.value,
            email: formRef.current.email?.value,
            phoneNumber: formRef.current.phoneNumber?.value,
        };

        // 검증
        
        console.log("React 19 제출 데이터:", data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <NameField ref={(el) => (formRef.current.name = el)} />

            <input
                ref={(el) => (formRef.current.email = el)}
                placeholder="이메일"
            />

            <input
                ref={(el) => (formRef.current.phoneNumber = el)}
                placeholder="전화번호"
            />

            <button type="submit">제출</button>
        </form>
    );
}