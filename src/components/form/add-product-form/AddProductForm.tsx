import { Button } from 'antd'
import { Field, type FormRenderProps } from 'react-final-form'

import { statuses } from '@/config/statuses'
import type { NewProductPayload } from '@/types'
import { useAppSelector } from '@/hooks/app-hooks'
import FormField from '@/components/form/form-field/FormField'
import FormFieldSelect from '@/components/form/form-field/FormFieldSelect'
import FormFieldUploader from '@/components/form/form-field/FormFieldUploader'
import FormFieldTextarea from '@/components/form/form-field/FormFieldTextArea'
import FormFieldDatepicker from '@/components/form/form-field/FormFieldDatepicker'

export default function AddProductForm({
    handleSubmit,
    submitting,
    hasValidationErrors
}: FormRenderProps<NewProductPayload>) {
    const categories = useAppSelector((state) => state.global.categories)
    const isEditingProduct = useAppSelector(
        (state) => state.global.isProductEditing
    )

    return (
        <form onSubmit={handleSubmit}>
            <Field name="name">
                {({ input, meta }) => (
                    <FormField
                        meta={meta}
                        input={input}
                        label="Название товара"
                        placeholder="Введите название товара"
                    />
                )}
            </Field>

            <Field name="description">
                {({ input, meta }) => (
                    <FormFieldTextarea
                        meta={meta}
                        input={input}
                        label="Описание товара"
                        textareaProps={{
                            placeholder: 'Введите описание к товару',
                            rows: 10,
                            autoSize: { minRows: 8, maxRows: 10 }
                        }}
                    />
                )}
            </Field>

            <Field name="category">
                {({ input, meta }) => (
                    <FormFieldSelect
                        meta={meta}
                        input={input}
                        label="Категория товара"
                        selectProps={{
                            options: categories,
                            placeholder: 'Выберите категорию',
                            notFoundContent: 'Ничего не найдено',
                            value: input.value ? input.value : null
                        }}
                    />
                )}
            </Field>

            <Field name="price">
                {({ input, meta }) => (
                    <FormField
                        meta={meta}
                        input={input}
                        inputType="tel"
                        label="Цена товара"
                        placeholder="Введите цену"
                    />
                )}
            </Field>

            <Field name="status">
                {({ input, meta }) => (
                    <FormFieldSelect
                        meta={meta}
                        input={input}
                        label="Статус товара"
                        selectProps={{
                            placeholder: 'Выберите статус товара',
                            options: statuses,
                            value: input.value ? input.value : null
                        }}
                    />
                )}
            </Field>

            <Field name="releaseDate">
                {({ input, meta }) => (
                    <FormFieldDatepicker
                        meta={meta}
                        input={input}
                        label="Дата релиза"
                        datePickerProps={{ placeholder: 'Укажите дату релиза' }}
                    />
                )}
            </Field>

            <Field name="image">
                {({ input, meta }) => (
                    <FormFieldUploader
                        meta={meta}
                        input={input}
                        label="Изображение для товара (опционально)"
                        uploadProps={{
                            maxCount: 1,
                            accept: '.jpg,.png,.jpeg',
                            action:
                                import.meta.env.VITE_UPLOADER_BASE_API_URL +
                                '/upload?key=' +
                                import.meta.env.VITE_UPLOADER_API_TOKEN
                        }}
                    />
                )}
            </Field>

            <Button
                block
                htmlType="submit"
                size="large"
                type="primary"
                disabled={submitting || hasValidationErrors}
            >
                {isEditingProduct ? 'Сохранить изменения' : 'Добавить товар'}
            </Button>
        </form>
    )
}
