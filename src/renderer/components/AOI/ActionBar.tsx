/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { py } from '../server/python/ivt';

import { BgImgBtn } from '../Button/BgImgBtn';

interface ActionBarProps {
  container: HTMLDivElement | null;
  setBgImg: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ActionBar: React.FC<ActionBarProps> = ({ setBgImg }) => {
  return (
    <div className="absolute top-1 right-2 z-50">
      <BgImgBtn setBgImg={setBgImg} />
    </div>
  );
};
