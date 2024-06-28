import { Input } from 'antd'
import type { ReactNode } from 'react'
import type { FieldInputProps, FieldMetaState } from 'react-final-form'

import classes from '@/components/form/form-field/form-field.module.scss'

type Props = {
    label?: string
    placeholder?: string
    inputPrefix?: ReactNode
    meta: FieldMetaState<string>
    inputType?: 'text' | 'tel' | 'password'
    input: FieldInputProps<string, HTMLElement>
}

export default function FormField({ input, placeholder, label, meta, inputPrefix, inputType = 'text' }: Props) {
    return (
        <label className={classes['form-field']}>
            <span className={classes['form-field__label']}>{label}</span>

            <Input {...input} size="large" type={inputType} prefix={inputPrefix} placeholder={placeholder} className={classes['form-field__input']} />

            {meta.touched && meta.error && <span className={classes['form-field__input-error']}>{meta.error}</span>}
        </label>
    )
}
