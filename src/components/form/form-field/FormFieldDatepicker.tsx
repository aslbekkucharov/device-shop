import { DatePicker, type DatePickerProps } from 'antd'
import { FieldInputProps, FieldMetaState } from 'react-final-form'
import classes from '@/components/form/form-field/form-field.module.scss'

type Props = {
    label?: string
    meta: FieldMetaState<any>
    datePickerProps?: DatePickerProps
    input: FieldInputProps<any, HTMLElement>
}

export default function FormFieldDatepicker({ input, label, meta, datePickerProps }: Props) {
    return (
        <label className={classes['form-field']}>
            <span className={classes['form-field__label']}>{label}</span>
            <DatePicker
                {...input}
                size="large"
                {...datePickerProps}
                className={classes['form-field__input']}
            />
            {meta.touched && meta.error && <span className={classes['form-field__input-error']}>{meta.error}</span>}
        </label>
    )
}