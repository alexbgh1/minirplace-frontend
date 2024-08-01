import Countries from "../data/countries.json";

interface Country {
  iso: string;
  name: string;
  unicode: string;
  flag: string;
}

export const getEmojiFlag = (countryCode: string): string => {
  /**
   * Get the emoji flag from the country code
   * @param countryCode - The country code
   * @returns The emoji flag
   * @example
   * getEmojiFlag("US") -> 🇺🇸
   * getEmojiFlag("BR") -> 🇧🇷
   *  */
  const country = Countries.find((country: Country) => country.iso === countryCode);
  return country?.flag || "";
};
