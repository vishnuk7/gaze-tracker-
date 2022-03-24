import { useState } from 'react';
import { ActionBar } from './ActionBar';
import { ScanPathCanvas } from './canvas';

export const ScanPath = () => {
  const [containerDiv, setContainerDiv] = useState<HTMLDivElement | null>();
  const [bgImage, setBgImg] = useState<string | undefined>();

  console.log('hey, there');

  return (
    <div className="w-screen h-screen relative">
      <div
        style={{
          background:
            bgImage &&
            `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImage}) no-repeat center center fixed`
        }}
        className="h-full w-full overflow-hidden flex justify-center items-center"
        ref={(c) => setContainerDiv(c)}
      >
        {/* <img style={{ width: '1050px', height: '1050px' }} src={bgImage} alt="" height="1050px" width="1050px" /> */}
        <ScanPathCanvas />
      </div>
      <>
        <header className="flex w-full h-screen justify-center items-center">
          {containerDiv && <ActionBar container={containerDiv} setBgImg={setBgImg} />}
        </header>
      </>
      {/* <div className="w-screen h-screen"></div> */}
    </div>
  );
};
