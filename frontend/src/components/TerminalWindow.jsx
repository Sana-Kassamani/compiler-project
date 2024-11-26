import { useEffect } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const TerminalWindow = () => { 
  useEffect(() => {
    const terminal = new Terminal();
    terminal.open(document.getElementById('terminal'));
    terminal.write('Welcome to the terminal!\n');
  }, []);

  return <div id="terminal" style={{ height: '200px', width: '100%' }}></div>;
};

export default TerminalWindow;