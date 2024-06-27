import { useState } from "react"
import { setIn } from "final-form"
import { v4 as uuidv4 } from 'uuid'
import { ValidationError } from "yup"
import { Modal, ModalProps, message } from "antd"
import { Form, FormRenderProps } from "react-final-form"

import { $api } from "@/api"
import { NewProductPayload, PageableResponse } from "@/types"
import { useGlobal } from "@/hooks/useGlobal"
import { productSchema } from "@/validations"
import AddProductForm from "@/components/form/add-product-form/AddProductForm"
import { useAppDispatch } from "@/hooks/app-hooks"
import { productsApi } from "@/services/products"
import { setProductModalVisibility, setProducts } from "@/store/global/store"
import { Product } from "@/types/product"

type Props = {
    isOpen: boolean
}

export default function AddProductModal({ isOpen }: Props) {

    const config: ModalProps = {
        open: isOpen,
        footer: null,
        title: "Добавление товара",
        onCancel: () => dispatch(setProductModalVisibility(false))
    }

    const dispatch = useAppDispatch()
    const [initialValues] = useState<NewProductPayload>()
    const [messageApi, contextHolder] = message.useMessage()

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

    async function handleFormSubmit(payload: NewProductPayload) {
        try {
            const messageKey = 'updatable'

            messageApi.open({ key: messageKey, type: 'loading', content: 'Подождите, ваш товар создается...' })

            const body = {
                ...payload,
                id: uuidv4(),
                createdAt: new Date(),
                price: +payload.price
            }

            const response = await $api.post('/products', body)

            if (response.status === 201) {

                productsApi.getProducts<PageableResponse<Product>>({ _page: 1, _per_page: 6 }).then(res => {
                    messageApi.open({ key: messageKey, type: 'success', content: 'Товар успешно создан!' })
                    dispatch(setProducts(res.data.data))
                    dispatch(setProductModalVisibility(false))
                })
            }

        } catch (error) {
            messageApi.success('Что-то пошло не так при создании товара')
        }
    }

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