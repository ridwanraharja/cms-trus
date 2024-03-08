import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
// import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Careers from './pages/Dashboard/Careers/Careers';
import PrivateRoute from './components/PrivateRoute';
import CreateCareer from './pages/Dashboard/Careers/createCareer';
import UpdateCareer from './pages/Dashboard/Careers/UpdateCareer';
import Topics from './pages/Dashboard/MessageForms/Topics/Topics';
import UpdateTopic from './pages/Dashboard/MessageForms/Topics/UpdateTopic';
import CreateTopic from './pages/Dashboard/MessageForms/Topics/CreateTopic';
import DetailMessage from './pages/Dashboard/MessageForms/Messages/DetailMessage';
import Messages from './pages/Dashboard/MessageForms/Messages/Messages';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          {/* <Route
            index
            element={
              <>
                <PageTitle title="eCommerce Dashboard | Admin CMS" />
                <ECommerce />
              </>
            }
          /> */}
          <Route
            index
            element={
              <>
                <PageTitle title="Careers" />
                <Careers />
              </>
            }
          />
          <Route
            path="/careers/create"
            element={
              <>
                <PageTitle title="Careers" />
                <CreateCareer />
              </>
            }
          />
          <Route
            path="/careers/update/:careerId"
            element={
              <>
                <PageTitle title="Careers" />
                <UpdateCareer />
              </>
            }
          />
          <Route
            path="/topics/create"
            element={
              <>
                <PageTitle title="Topics" />
                <CreateTopic />
              </>
            }
          />

          <Route
            path="/topics/update/:topicId"
            element={
              <>
                <PageTitle title="Topics" />
                <UpdateTopic />
              </>
            }
          />
          <Route
            path="/topics"
            element={
              <>
                <PageTitle title="Topics" />
                <Topics />
              </>
            }
          />
          <Route
            path="/messageforms/detail/:messageformId"
            element={
              <>
                <PageTitle title="Message Forms" />
                <DetailMessage />
              </>
            }
          />
          <Route
            path="/messageforms"
            element={
              <>
                <PageTitle title="Message Forms" />
                <Messages />
              </>
            }
          />
          <Route
            path="/calendar"
            element={
              <>
                <PageTitle title="Calendar | Admin CMS" />
                <Calendar />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | Admin CMS" />
                <Profile />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements | Admin CMS" />
                <FormElements />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout | Admin CMS" />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Tables | Admin CMS" />
                <Tables />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | Admin CMS" />
                <Settings />
              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart | Admin CMS" />
                <Chart />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | Admin CMS" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | Admin CMS" />
                <Buttons />
              </>
            }
          />
        </Route>
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Admin CMS" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Admin CMS" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
