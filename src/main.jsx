import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {reducer} from './reducer'
import { legacy_createStore } from 'redux'
import { Provider } from 'react-redux'

const store = legacy_createStore(reducer)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
