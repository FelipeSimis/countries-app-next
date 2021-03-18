export const themes = {
  dark: {
    elements: 'hsl(209, 23%, 22%)',
    background: 'hsl(207, 26%, 17%)',
    text: 'hsl(0, 0%, 100%)',
  },

  light: {
    elements: 'hsl(0, 0%, 100%)',
    background: 'hsl(0, 0%, 95%)',
    text: 'hsl(200, 15%, 8%)',
  },
};

export type ThemeName = keyof typeof themes;
export type ThemeType = typeof themes.dark | typeof themes.light;
