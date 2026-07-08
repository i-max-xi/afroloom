import { Spinner } from './spinner';
const Logo = '/assets/AFRO_LOGO_4_transparent.webp';

export const LazyScreen = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col gap-1 items-center justify-center">
      <p className="animate-pulse flex w-full items-center justify-center">
        <img src={Logo} alt="logo" width="15%" height="15%" />
      </p>
      <div className="">
        <Spinner />
      </div>
    </div>
  </div>
);
