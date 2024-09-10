import './App.css';
import Body from './component/Body';
import {Provider} from 'react-redux'
import appStore from './utils/appStore';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Browse from './component/Browse';

function App() {

  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<Body/>
    },
    {
      path:'/browse',
      element:<Browse/>
    }
  ])

  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter}/>
    </Provider>
  );
}

export default App;
