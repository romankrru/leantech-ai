export const debounce = <T extends (...args: any[]) => void>(fn: T, ms: number) => {
  let onCooldown = false

  return (...args: Parameters<T>): void => {
    if(onCooldown) {
      return
    }

    fn(...args)
    onCooldown = true
    setTimeout(() => onCooldown = false, ms)
  }
}
