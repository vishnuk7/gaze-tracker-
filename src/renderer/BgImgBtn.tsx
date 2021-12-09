import { useRef } from 'react';

interface BgImgBtnProps {
  setBgImg: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const BgImgBtn: React.FC<BgImgBtnProps> = ({ setBgImg }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onHandleButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (inputRef !== null) {
      inputRef.current?.click();
    }
  };

  const toBase64 = (file: Blob): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      <input
        className="hidden"
        type="file"
        accept="image/png"
        ref={inputRef}
        onChange={async (e) => {
          if (e.target.files !== null) {
            const imgValue = await toBase64(e.target.files[0]);
            if (imgValue !== null && typeof imgValue === 'string') setBgImg(imgValue);
          }
        }}
      />

      <button
        type="button"
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        onClick={onHandleButton}
      >
        Select Image
      </button>
    </>
  );
};
