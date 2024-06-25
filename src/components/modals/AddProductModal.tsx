import { useState } from "react"
import { setIn } from "final-form"
import { v4 as uuidv4 } from 'uuid'
import { ValidationError } from "yup"
import { Modal, ModalProps, message } from "antd"
import { Form, FormRenderProps } from "react-final-form"

import { api } from "@/api"
import { NewProductPayload } from "@/types"
import { useGlobal } from "@/hooks/useGlobal"
import { productSchema } from "@/validations"
import AddProductForm from "@/components/form/AddProductForm/AddProductForm"

type Props = {
    isOpen: boolean
}

export default function AddProductModal({ isOpen }: Props) {

    const config: ModalProps = {
        open: isOpen,
        footer: null,
        title: "Добавление товара",
        onCancel: () => setIsProductAddModalVisible(false)
    }

    const { setIsProductAddModalVisible } = useGlobal()
    const [messageApi, contextHolder] = message.useMessage()
    const [initialValues, setInitialValues] = useState<NewProductPayload>()

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

            const body = {
                ...payload,
                id: uuidv4(),
                createdAt: new Date(),
                price: +payload.price
            }

            const response = await api.post('/products', body)

            if (response.status === 201) {
                messageApi.success('Товар успешно создан!')
                setIsProductAddModalVisible(false)
            }

        } catch (error) {
            console.log(error)
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