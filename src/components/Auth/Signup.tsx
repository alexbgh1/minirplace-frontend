import Contries from "../../data/countries.json";
import { useState } from "react";
import { useAuth } from "../../context/auth-context";

interface Country {
  name: string;
  iso: string;
}
const Signup = () => {
  const { handleRegister } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [country, setCountry] = useState<Country>({
    name: "Afghanistan",
    iso: "AF",
  });

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = Contries.find((country) => country.iso === event.target.value);
    if (selectedCountry) {
      setCountry(selectedCountry);
    }
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister({ username, country_code: country.iso, country_name: country.name });
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col items-start gap-2">
      <fieldset className="flex flex-row items-center w-full">
        <label className="w-1/3 text-left" htmlFor="username-register">
          Username
        </label>
        <input
          className="w-2/3 h-8 p-1 bg-transparent border rounded-md outline-none border-zinc-500 focus:border-white/50 "
          type="username"
          id="username-register"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </fieldset>
      <fieldset className="flex flex-row items-center w-full">
        <label className="w-1/3 text-left" htmlFor="country">
          Country
        </label>
        <select
          id="country"
          onChange={handleCountryChange}
          value={country.iso}
          className="w-2/3 h-8 p-1 border rounded-md outline-none text-gray-950 focus:border-zinc-500"
        >
          {Contries.sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
            <option key={country.iso} value={country.iso}>
              {country.name}
            </option>
          ))}
        </select>
      </fieldset>
      <input
        type="submit"
        value="Register"
        className="w-full h-8 px-4 py-1 text-gray-300 transition-colors duration-300 ease-in-out border rounded-md hover:cursor-pointer hover:text-white border-zinc-500 hover:border-white/50 hover:bg-white/5"
      />
    </form>
  );
};

export default Signup;
