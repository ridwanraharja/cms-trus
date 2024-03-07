import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { query } from '../../../utils/axiosUtil';
import { current } from '@reduxjs/toolkit';

const UpdateCareer = () => {
  const [formData, setFormData] = useState({
    title: '',
    city: '',
    country: '',
    link: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state: any) => state.user);

  const { careerId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.city ||
      !formData.country ||
      !formData.link
    ) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);

      const data: any = await query(
        'PUT',
        `/api/career/updatecareer/${careerId}/${currentUser._id}`,
        formData,
      );
      console.log(data);

      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (data.success === true) {
        navigate('/');
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const getCareers = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res: any = await query(
        'GET',
        '/api/career/getcareers?careerId=' + careerId,
      );
      if (res.success === false) {
        setLoading(false);
        return setErrorMessage(res.message);
      }

      setLoading(false);
      if (res.success === true) {
        setFormData(res.careers[0]);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCareers();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Career" />

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Input Fields
              </h3>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5.5 p-6.5"
            >
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  value={formData.title}
                  placeholder="Write your title here: 'ex: Business Development'"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  value={formData.city}
                  placeholder="Write your city here: 'ex: Jakarta'"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  value={formData.country}
                  placeholder="Write your country here: 'ex: Indonesia'"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Link
                </label>
                <input
                  id="link"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  value={formData.link}
                  placeholder="Write your link here: 'ex: https://www.linkedin.com/company/synapsis-id/jobs/'"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              {errorMessage && (
                <div className="flex w-full mb-5 border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-2 py-3 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-3">
                  <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                        fill="#ffffff"
                        stroke="#ffffff"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-full flex items-center">
                    <h5 className="m-0 font-semibold text-[#B45454]">
                      {errorMessage}
                    </h5>
                  </div>
                </div>
              )}
              <div className="flex w-full justify-end">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-3"
                >
                  Update Career
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UpdateCareer;
