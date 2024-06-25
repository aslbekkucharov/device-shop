import { object, string, number } from "yup"

export const loginSchema = object({
    username: string().required('Введите имя пользователя, поле обязятельно для заполнения'),
    password: string().required('Введите пароль, поле обязательно для заполнения')
})

export const productSchema = object({
    image: string(),
    name: string().required('Введите название товара'),
    status: string().required('Укажите статус продукта'),
    category: string().required('Выберите категорию товара'),
    description: string().required('Введите описание товара'),
    price: number().required('Введите рекомендуемую цену товара'),
    releaseDate: string().required('Укажите дату релиза продукта')
})