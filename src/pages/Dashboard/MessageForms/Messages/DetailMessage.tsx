import { Link, useParams } from 'react-router-dom';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { query } from '../../../../utils/axiosUtil';

const DetailMessage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { messageformId } = useParams();
  const getMessageForms = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res: any = await query(
        'GET',
        '/api/messageform/getmessageforms?messageformId=' + messageformId,
      );
      if (res.success === false) {
        setLoading(false);
        return setErrorMessage(res.message);
      }

      setLoading(false);
      if (res.success === true) {
        setFormData(res.messageforms[0]);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessageForms();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Message Form Detail" />

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Details
              </h3>
            </div>
            <div className="flex flex-col gap-4 p-6.5 pt-2">
              <h5 className="block text-black dark:text-white">
                Topic: <span className="italic">{formData.topic}</span>
              </h5>
              <h5 className="block text-black dark:text-white">
                from <span className="font-bold">Mr./Ms. {formData.name}</span>
              </h5>
              <h5 className="block text-black dark:text-white">
                {formData.message}
              </h5>
              <div>
                <h5 className="block text-black dark:text-white">
                  {formData.name}
                </h5>
                <h5 className="block text-black dark:text-white">
                  {formData.email}
                </h5>
                <h5 className="block text-black dark:text-white">
                  {formData.phone}
                </h5>
              </div>
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
            <div className="flex w-full justify-end gap-2 p-4">
              <Link to="/messageforms">
                <button className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-3">
                  Done
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DetailMessage;
