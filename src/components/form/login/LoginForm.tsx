import { Button } from "antd"
import { Field, type FormRenderProps } from "react-final-form"
import { LockOutlined, UserOutlined } from "@ant-design/icons"

import type { LoginPayload } from "@/types"
import FormField from "@/components/form/form-field/FormField"

export default function LoginForm({ handleSubmit, submitting }: FormRenderProps<LoginPayload>) {
    return (
        <form onSubmit={handleSubmit}>
            <Field name="username">
                {({ input, meta }) => (
                    <FormField
                        meta={meta}
                        input={input}
                        label="Имя пользователя"
                        placeholder="Введите имя пользователя"
                        inputPrefix={<UserOutlined className="text-gray" />}
                    />
                )}
            </Field>
            <Field name="password">
                {({ input, meta }) => (
                    <FormField
                        meta={meta}
                        input={input}
                        label="Пароль"
                        inputType="password"
                        placeholder="Введите пароль"
                        inputPrefix={<LockOutlined className="text-gray" />}
                    />
                )}
            </Field>

            <Button block htmlType="submit" size="large" type="primary" disabled={submitting}>Войти</Button>
        </form>
    )
}