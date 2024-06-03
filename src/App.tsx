import Header from './components/common/Header';
import Switcher from './components/common/Switcher';
import Sidebar from './components/common/Sidebar';
import BackOnTop from './components/common/BackOnTop';
import AllRoutes from './routes/AllRoutes';
import Loader from './util/Loader';
import { useSelector } from 'react-redux';

const App = (): JSX.Element => {
  const { utility_loading } = useSelector((state: any) => state.utilitySlice);

  return (
    <>
      {/* Loader */}
      <Loader
        loading={utility_loading}
      />

      <div className="wrapper">
        {/*  Top header */}
        <Header />

        {/* Switcher */}
        <Switcher />

        {/* Sidebar */}
        <Sidebar />

        {/* AllRoutes */}
        <AllRoutes />

        {/* Back To Top Button */}
        <BackOnTop />
      </div>
    </>
  );
};

export default App;
