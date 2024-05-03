import Routes from './Routes'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

export default App
