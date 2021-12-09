import { PythonShell } from 'python-shell';
import path from 'path';

export const py = () => {
  const pyShell = new PythonShell(path.resolve(__dirname, 'ivt.py'));

  pyShell.on('message', (message) => {
    console.log(message);
  });

  pyShell.end((err) => {
    if (err) {
      throw err;
    }
    console.log('finished');
  });
};
