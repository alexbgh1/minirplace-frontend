const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center w-full mt-12 mb-8 text-white cursor-default">
      <h1 className="text-4xl font-bold">
        r/place
        <sub className="text-xs transition-colors duration-300 ease-in-out text-white/90 hover:text-white/100">
          mini !🐱‍🏍
        </sub>
      </h1>
    </header>
  );
};

export default Header;
