import { useState, useEffect } from "react";
import axios from "axios";

// 이 방식 상위 호환이 있음: Error Boundary + Suspense + TanStack 키워드로 수련해바
function useFetchData() {
    const [data, setData] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        setIsLoading(true);

        axios.get("https://api.example.com/data", {
            signal: controller.signal
        })
            .then((resp) => {
                setData(resp.data);
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    console.log("요청이 취소되었습니다.");
                } else {
                    setErrorMsg(err.response?.data?.message);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });

        return () => controller.abort();
    }, []);

    return { data, errorMsg, isLoading };
}