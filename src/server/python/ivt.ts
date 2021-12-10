import { ipcRenderer } from 'electron';
import { PythonShell } from 'python-shell';
import path from 'path';

const runPy = async () => {
  const options = {
    pythonOptions: ['-u'],
    scriptPath: path.join(__dirname)
  };

  // wrap it in a promise, and `await` the result
  const result = await new Promise((resolve, reject) => {
    PythonShell.run('ivt.py', options, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  return result;
};

export const py = async () => {
  const msg = await runPy();

  return msg;

  // ipcRenderer.send('datacsv', msg);
};
