import { DM_Serif_Display, Roboto, Pacifico, Russo_One } from 'next/font/google';

const dmSerifDisplay400 = DM_Serif_Display({ weight: '400', subsets: ["latin"] });

const roboto = Roboto({ weight: '300', subsets: ["latin"] })

const pacifico = Pacifico({ weight: '400', subsets: ["cyrillic"]})

const russoOne = Russo_One({ weight: '400', subsets: ["latin"]})

// ...Еще больше шрифтов

export { dmSerifDisplay400, roboto, pacifico, russoOne }