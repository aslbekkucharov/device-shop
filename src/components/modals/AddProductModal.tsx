import dayjs from 'dayjs'
import { setIn } from "final-form"
import { v4 as uuidv4 } from 'uuid'
import { ValidationError } from "yup"
import { useEffect, useState } from "react"
import { Modal, ModalProps, message } from "antd"
import { Form, FormRenderProps } from "react-final-form"

import { $api } from "@/api"
import { productSchema } from "@/validations"
import type { Product } from "@/types/product"
import { productsApi } from "@/services/products"
import { useAppDispatch, useAppSelector } from "@/hooks/app-hooks"
import type { NewProductPayload, PageableResponse } from "@/types"
import { setEditingProduct, setIsProductEditing, setProductModalVisibility, setProducts } from "@/store/global/store"
import AddProductForm from "@/components/form/add-product-form/AddProductForm"

type Props = {
    isOpen: boolean
}

export default function AddProductModal({ isOpen }: Props) {

    const dispatch = useAppDispatch()
    const [messageApi, contextHolder] = message.useMessage()
    const [initialValues, setInitialValues] = useState<NewProductPayload>()
    const editingProduct = useAppSelector((state) => state.global.editingProduct)
    const isProductEditing = useAppSelector((state) => state.global.isProductEditing)

    const config: ModalProps = {
        open: isOpen,
        footer: null,
        destroyOnClose: true,
        onCancel: () => dispatch(setProductModalVisibility(false)),
        title: isProductEditing ? 'Редактирование товара' : 'Добавление товара'
    }

    function handleFormValidate(values: NewProductPayload) {

        try {
            productSchema.validateSync(values, { abortEarly: false })
        } catch (err) {
            if (err instanceof ValidationError) {
                return err.inner.reduce((errors, error) => {
                    return setIn(errors, error.path!, error.message)
                }, {} as object)
            }

            return {}
        }
    }

    function resetFormOnModalClose() {
        setInitialValues({
            name: '',
            price: 0,
            category: '',
            createdAt: '',
            description: '',
            releaseDate: '',
            status: 'published'
        })
    }

    async function handleFormSubmit(payload: NewProductPayload) {
        const loadingMessageContent = isProductEditing ? 'Подождите, ваш товар сохраняется...' : 'Подождите, ваш товар создается...'
        const errorMessageContent = isProductEditing ? 'Возникла непредвиденная ошибка при сохранении товара' : 'Возникла непредвиденная ошибка при создании товара'

        try {

            const method = isProductEditing ? 'put' : 'post'
            const endpoint = isProductEditing ? `/products/${editingProduct.id}` : '/products'

            messageApi.loading(loadingMessageContent, 1000)

            const body = {
                ...payload,
                id: uuidv4(),
                createdAt: new Date(),
                price: +payload.price
            }

            const response = await $api[method](endpoint, body)

            if (response.status >= 200 && response.status <= 300) {
                productsApi.getProducts<PageableResponse<Product>>({ _page: 1, _per_page: 6 }).then(res => {
                    dispatch(setProducts(res.data.data))
                    dispatch(setProductModalVisibility(false))
                })
            }

        } catch (error) {
            messageApi.error(errorMessageContent, 1000)
        }
    }

    useEffect(() => {

        if (isOpen && isProductEditing) {
            setInitialValues((prevVal) => ({
                ...prevVal,
                ...editingProduct,
                releaseDate: dayjs(editingProduct.releaseDate)
            }))
        }

        if (!isOpen) {
            resetFormOnModalClose()
            dispatch(setIsProductEditing(false))
            dispatch(setEditingProduct({} as Product))
        }

    }, [isOpen, isProductEditing])

    return (
        <Modal {...config}>
            {contextHolder}
            <Form

                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validate={handleFormValidate}
                render={(props: FormRenderProps<NewProductPayload>) => <AddProductForm {...props} />}
            />
        </Modal>
    )
}