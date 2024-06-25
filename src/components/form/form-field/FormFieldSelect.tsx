import { Select, SelectProps } from 'antd'
import type { FieldInputProps, FieldMetaState } from 'react-final-form'

import classes from '@/components/form/form-field/form-field.module.scss'

type Props = {
    label?: string
    selectProps?: SelectProps
    meta: FieldMetaState<any>
    input: FieldInputProps<any, HTMLElement>
}

export default function FormFieldSelect({ input, label, meta, selectProps }: Props) {
    return (
        <label className={classes['form-field']}>
            <span className={classes['form-field__label']}>{label}</span>
            <Select
                {...input}
                size="large"
                {...selectProps}
                className={classes['form-field__input']}
            />
            {meta.touched && meta.error && <span className={classes['form-field__input-error']}>{meta.error}</span>}
        </label>
    )
}