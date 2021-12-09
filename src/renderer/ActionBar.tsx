import { BgImgBtn } from './BgImgBtn';
import { UploadCSVBtn } from './UploadCSVBtn';

interface ActionBarProps {
  container: HTMLDivElement | null;
  setBgImg: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ActionBar: React.FC<ActionBarProps> = ({ container, setBgImg }) => {
  return (
    <div className="absolute top-1 right-2 z-50">
      <BgImgBtn setBgImg={setBgImg} />
      <UploadCSVBtn container={container} />
    </div>
  );
};
