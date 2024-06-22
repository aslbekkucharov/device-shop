import type { ThemeConfig } from "antd"

export const themeConfiguration: ThemeConfig = {
    token: {
        borderRadius: 8,
        colorPrimary: '#000000'
    },

    components: {

        Input: {
            activeBorderColor: 'rgba(0, 0, 0, 0.9)',
            activeShadow: '0 0 0 2px rgba(0, 0, 0, 0.5)'
        },

        Select: {
            optionSelectedBg: '#e2e8f0'
        }
    }
}