import dayjs, { type Dayjs } from 'dayjs'

export function debounce<T extends (...args: any[]) => void>(callback: T, wait: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        const later = () => {
            timeoutId = undefined
            callback.apply(this, args)
        }

        clearTimeout(timeoutId)
        timeoutId = setTimeout(later, wait)
    }
}

export function formatPrice(value: number) {
    const formatter = new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    })

    return formatter.format(value)
}

export function formatDate(inputDate: string | Dayjs): string {

    if (typeof inputDate === 'string') {
        const date = new Date(inputDate)

        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()

        return `${day}.${month}.${year}`
    }

    const date = dayjs(inputDate)

    return date.format('DD.MM.YYYY')
}
