import { Input } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import type { FieldInputProps, FieldMetaState } from 'react-final-form'

import classes from '@/components/form/form-field/form-field.module.scss'

type Props = {
    label?: string
    meta: FieldMetaState<string>
    textareaProps?: TextAreaProps
    input: FieldInputProps<string, HTMLElement>
}

export default function FormFieldTextarea({ input, label, meta, textareaProps }: Props) {
    return (
        <label className={classes['form-field']}>
            <span className={classes['form-field__label']}>{label}</span>

            <Input.TextArea {...input} {...textareaProps} className={classes['form-field__input']} />

            {meta.touched && meta.error && <span className={classes['form-field__input-error']}>{meta.error}</span>}
        </label>
    )
}
