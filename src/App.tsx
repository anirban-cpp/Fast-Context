import React from 'react'
import createFastContext from './createFastContext';

const { Provider, useStore } = createFastContext({
  first: "",
  last: ""
})

const DisplayContainer = () => {
  const [store] = useStore();

  return (
    <div className="display">
      Display Container
      <p>Text1: {store.first}</p>
      <p>Text2: {store.last}</p>
    </div>
  );
};

const FormContainer = () => {
  const [store, setStore] = useStore();

  return (
    <div className="form">
      Form Container
      <input
        placeholder="Text 1"
        type="text"
        value={store.first}
        onChange={(e) => setStore({ ...store, first: e.target.value })}
      />
      <input
        placeholder="Text 2"
        type="text"
        value={store.last}
        onChange={(e) => setStore({ ...store, last: e.target.value })}
      />
    </div>
  );
};

const ContentContainer = () => {
  return (
    <div className="content">
      Content Container
      <div className="content-data">
        <FormContainer />
        <DisplayContainer />
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider>
      <div className="App">
        <p>App</p>
        <ContentContainer />
      </div>
    </Provider>
  );
}

export default App;
