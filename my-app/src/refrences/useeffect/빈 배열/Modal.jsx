import { useEffect } from "react";

export default function Modal({ onClose }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc)
        }


    }, []); // 빈 배열: 마운트 시 한 번만 실행, 언마운트 시 cleanup 실행

    return (
        <div className="modal">
            <h2>모달 창</h2>
            <p>ESC 키를 누르면 닫힙니다.</p>
        </div>
    );
}