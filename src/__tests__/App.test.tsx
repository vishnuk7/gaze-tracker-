/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

describe('App', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
