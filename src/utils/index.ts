export function debounce<T extends (...args: any[]) => void>(callback: T, wait: number): T {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    return function (this: any, ...args: Parameters<T>) {
        const context = this

        const later = () => {
            timeoutId = undefined
            callback.apply(context, args)
        }

        clearTimeout(timeoutId)
        timeoutId = setTimeout(later, wait)
    } as T
}

export function formatPrice(value: number) {
    const formatter = new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    })

    return formatter.format(value)
}

export function formatDate(inputDate: string): string {
    const date = new Date(inputDate)

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
}
