import { useState } from "react";

function Form() {
    const [form, setForm] = useState({ name: "", email: "", phoneNumber: "" });

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // 새로고침 방지 
    }

    return (
        <form onSubmit={handleSubmit}>
            <NameField
                value={form.name}
                onChange={(val) => handleChange("name", val)}
            />
            {/* 이메일, 전화번호 필드도 똑같은 handleChange로 처리 가능! */}
        </form >
    );
}

function NameField({ value, onChange }) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="이름을 입력하세요"
        />
    );
}