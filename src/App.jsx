import './styles/globalstyles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import HomePage from './pages/homepage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      }
      //아래에 추가해주세요.
    ]
  }
])



function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
