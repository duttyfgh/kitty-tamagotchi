export let theme: 'light' | 'dark'
    = 'light'

export const OnTheme = (newTheme: 'light' | 'dark') => {
    theme = newTheme
}