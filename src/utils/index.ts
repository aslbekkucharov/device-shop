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
