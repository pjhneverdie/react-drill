import { useRef } from 'react';

const OtpForm = () => {
    const inputs = useRef({});

    const handleChange = (e, index) => {
        const { value } = e.target;

        if (value && index < 3) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleSubmit = () => {
        const code = Object.values(inputs.current)
            .map(input => input.value)
            .join('');

        if (code.length < 4) {
            alert("4자리 모두 입력해주세요!");
            return;
        }
        
        console.log("인증번호 제출:", code);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h3>인증번호를 입력하세요</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                {[0, 1, 2, 3].map((index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        // [핵심] el(DOM 요소)을 inputs.current 객체에 index 키로 저장
                        ref={(el) => (inputs.current[index] = el)}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        style={{
                            width: '50px',
                            height: '60px',
                            fontSize: '24px',
                            textAlign: 'center',
                            borderRadius: '8px',
                            border: '2px solid #ddd'
                        }}
                    />
                ))}
            </div>
            <button
                onClick={handleSubmit}
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
                인증하기
            </button>
        </div>
    );
};

export default OtpForm;