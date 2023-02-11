import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register, Landing, Error, ProtectedRoutes } from './pages';
import {
  AddJob,
  AllJobs,
  Profile,
  Stats,
  SharedLayout,
} from './pages/dashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoutes>
                <SharedLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Stats />} />
            <Route path='all-jobs' element={<AllJobs />} />
            <Route path='add-job' element={<AddJob />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
