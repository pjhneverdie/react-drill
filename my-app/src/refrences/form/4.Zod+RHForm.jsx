import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// useFormContext도 필요하면 봐바.

const schema = z.object({
    username: z
        .string()
        .min(2, { message: "이름은 최소 2글자 이상이어야 합니다." }),
    email: z.email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
        .string()
        .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
        .regex(/[A-Z]/, { message: "대문자를 최소 하나 포함해야 합니다." }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
});

const ZodForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = (data) => {
        console.log("검증 완료된 데이터:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
            <div>
                <input {...register("username")} placeholder="이름" />
                {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
            </div>

            <div>
                <input {...register("email")} placeholder="이메일" />
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>

            <div>
                <input type="password" {...register("password")} placeholder="비밀번호" />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>

            <div>
                <input type="password" {...register("confirmPassword")} placeholder="비밀번호 확인" />
                {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
            </div>
        </form>
    );
};

export default ZodForm;