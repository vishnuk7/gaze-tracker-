import { useState } from 'react';
// import styled, { css } from 'styled-components';
import { ActionBar } from './ActionBar';

function App() {
  const [containerDiv, setContainerDiv] = useState<HTMLDivElement | null>();
  const [bgImage, setBgImg] = useState<string | undefined>();

  return (
    <div className="w-screen h-screen relative">
      <div
        style={{
          background: bgImage && `url(${bgImage}) no-repeat center center fixed`
        }}
        className="h-full w-full overflow-hidden"
        ref={(c) => setContainerDiv(c)}
      >
        <header className="flex w-full h-screen justify-center items-center">
          {containerDiv && <ActionBar container={containerDiv} setBgImg={setBgImg} />}
        </header>
      </div>
    </div>
  );
}

export default App;
