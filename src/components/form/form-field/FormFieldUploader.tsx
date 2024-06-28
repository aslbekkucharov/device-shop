import type { UploadFile } from 'antd/lib'
import type { RcFile } from 'antd/es/upload'
import { FileImageOutlined } from '@ant-design/icons'
import { App, Image, Upload, type UploadProps } from 'antd'
import type { FieldInputProps, FieldMetaState } from 'react-final-form'

import { useEffect, useState } from 'react'
import { UploadResponseType } from '@/types'
import { UploadChangeParam } from 'antd/lib/upload'
import classes from '@/components/form/form-field/form-field.module.scss'

type Props = {
    label?: string
    uploadProps?: UploadProps
    meta: FieldMetaState<string>
    input: FieldInputProps<string, HTMLElement>
}

export default function FormFieldSelect({ input, label, meta, uploadProps }: Props) {

    const { message } = App.useApp()
    const [fileList, setFileList] = useState<UploadFile[]>([])

    function validateFileType(file: RcFile) {
        const isAllowedType = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg'

        if (!isAllowedType) {
            message.error(`${file.name} имеет неверный тип файла, поддерживаемые типы файлов: png, jpg, jpeg`, 4)
        }

        return isAllowedType || Upload.LIST_IGNORE
    }

    function handleFileChange(e: UploadChangeParam<UploadFile<UploadResponseType>>) {
        setFileList(() => e.fileList)
        input.onChange(e.file.response?.data.url)
    }

    useEffect(() => {
        console.log(input.value)
    }, [input])

    return (
        <span className={classes['form-field']}>
            <span className={classes['form-field__label']}>{label}</span>
            <Upload {...input} {...uploadProps} onChange={handleFileChange} listType="picture" fileList={fileList} beforeUpload={validateFileType} type='drag'>
                <p className="ant-upload-drag-icon">
                    <FileImageOutlined />
                </p>
                <p className="ant-upload-text">Кликните или перетащите изображение чтобы загрузить</p>
            </Upload>

            {input.value ? <Image placeholder={true} width={200} preview={false} src={input.value} className={classes['form-field__preview']} /> : null}

            {meta.touched && meta.error && <span className={classes['form-field__input-error']}>{meta.error}</span>}
        </span>
    )
}