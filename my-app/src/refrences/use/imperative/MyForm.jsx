import { useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    title: z.string().min(1, "제목을 적어주세요."),
    content: z.string().min(5, "내용은 5글자 이상!"),
});

function ChildForm({ ref }) {
    const { register, trigger, getValues, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        mode: "onSubmit",
        reValidateMode: "onSubmit"
    });

    // 부모는 아무것도 몰라 여기서 다 해
    useImperativeHandle(ref, () => ({
        validateAndGetData: async () => {
            const isValid = await trigger();
            if (isValid) return getValues();
            return null;
        }
    }));

    return (
        <div style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px' }}>
            <input {...register("title")} placeholder="제목" />
            {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}

            <textarea {...register("content")} placeholder="내용" />
            {errors.content && <p style={{ color: 'red' }}>{errors.content.message}</p>}
        </div>
    );
}