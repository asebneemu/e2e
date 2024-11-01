import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
    email: Yup.string().email('Geçersiz email').required('Email gereklidir'),
    password: Yup.string().min(6, 'Şifre en az 6 karakter olmalıdır').required('Şifre gereklidir'),
    terms: Yup.boolean().oneOf([true], 'Şartları kabul etmelisiniz')
});

const Login = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = (data) => {
        console.log(data);
        // success sayfasına yönlendirme yapılabilir
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" {...register('email')} placeholder="Email" />
            {errors.email && <p>{errors.email.message}</p>}

            <input type="password" {...register('password')} placeholder="Şifre" />
            {errors.password && <p>{errors.password.message}</p>}

            <label>
                <input type="checkbox" {...register('terms')} />
                Şartları kabul ediyorum
            </label>
            {errors.terms && <p>{errors.terms.message}</p>}

            <button type="submit" disabled={!isValid}>Giriş Yap</button>
        </form>
    );
};

export default Login;
