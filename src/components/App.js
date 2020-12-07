import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import LogItem from './LogItem';
import AddLogItem from './AddLogItem';
import { ipcRenderer } from 'electron';

const App = () => {
  const [logs, setLogs] = useState([]);

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    varient: 'success',
  });

  useEffect(() => {
    ipcRenderer.send('logs:load');

    ipcRenderer.on('logs:get', (e, logs) => {
      setLogs(JSON.parse(logs));
    });

    ipcRenderer.on('logs:clear', () => {
      setLogs([]);
      showAlert('Logs Clear', 'success');
    });
  }, []);

  function addItem(item) {
    if (item.text === '' || item.user === '' || item.priority === '') {
      showAlert('Please enter all fields', 'danger');
      return;
    }

    ipcRenderer.send('logs:add', item);

    showAlert('Log Added', 'success');
  }

  function deleteItem(_id) {
    ipcRenderer.send('logs:delete', _id);

    showAlert('Log Removed', 'success');
  }

  function showAlert(message, varient) {
    setAlert({
      show: true,
      message: message,
      varient: varient,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: '',
        varient: 'success',
      });
    }, 3000);
  }

  return (
    <Container>
      <AddLogItem addItem={addItem} />
      {alert.show && <Alert variant={alert.varient}>{alert.message}</Alert>}
      <Table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Log Text</th>
            <th>User</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <LogItem key={log._id} log={log} deleteItem={deleteItem} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
