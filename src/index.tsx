import React from 'react';
import ReactDOM from 'react-dom/client';
import ParamsEditor from './ParamsEditor'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <ParamsEditor {...{
          params: [
              {id: 1, name: 'Name 1', type: 'string'},
              {id: 2, name: 'Name 2', type: 'string'},
              {id: 3, name: 'Name 3', type: 'string'},
          ],
          model: {
              paramValues: [
                  {paramId: 1, value: 'Value 1'},
                  {paramId: 2, value: 'Value 2'},
              ],
              colors: [{paramId: 1, color: '#123987'}]
          }

      }}/>
  </React.StrictMode>
);
