import { type ObjectSchema, object, string } from "yup"

interface LoginPayloadSchema {
    username: string
    password: string
}

export const loginSchema: ObjectSchema<LoginPayloadSchema> = object({
    username: string().required('Введите имя пользователя, поле обязятельно для заполнения'),
    password: string().required('Введите пароль, поле обязательно для заполнения')
})