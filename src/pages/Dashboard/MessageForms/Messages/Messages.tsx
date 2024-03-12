import React, { useEffect, useState } from 'react';
import TableThree from '../../../../components/Tables/TableThree';
import DefaultLayout from '../../../../layout/DefaultLayout';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { query } from '../../../../utils/axiosUtil';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { BiDetail } from 'react-icons/bi';
import { MdOutlineTopic } from 'react-icons/md';
import { MdOutlineWork } from 'react-icons/md';
import { Modal as modal } from '../../../../components/Modal/Modal';
import { useSelector } from 'react-redux';

const Messages = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state: any) => state.user);
  const [selectedId, setSelectedId] = useState('');

  const handleRemove = async (id: any) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const res: any = await query(
        'DELETE',
        `/api/messageform/deletemessageform/${id}`,
      );

      if (res.success === false) {
        setLoading(false);
        return setErrorMessage(res.message);
      }

      if (res.success === true) {
        setLoading(false);
        setShowModal(false);
        getMessageForms();
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  const getMessageForms = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res: any = await query('GET', '/api/messageform/getmessageforms');
      if (res.success === false) {
        setLoading(false);
        return setErrorMessage(res.message);
      }

      setLoading(false);
      if (res.success === true) {
        setData(res.messageforms);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessageForms();
  }, []);

  console.log(data);
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Message Forms" />
        <div className="flex flex-col gap-6">
          <div className="rounded-sm border border-stroke bg-white px-5 py-6  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  {loading && (
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <td className="text-center" colSpan={6}>
                        <div className="py-4 px-4 animate-pulse h-7 bg-slate-400 rounded"></div>
                      </td>
                    </tr>
                  )}
                  {!loading && (
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Name
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Email
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Phone
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Topic
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Message
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Action
                      </th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {loading && (
                    <>
                      <tr>
                        <td className="border-b  border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <div className="animate-pulse max-w-[80%] h-7 bg-slate-400 rounded"></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b  border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <div className="animate-pulse max-w-[60%] h-7 bg-slate-400 rounded"></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b  border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <div className="animate-pulse max-w-[40%] h-7 bg-slate-400 rounded"></div>
                        </td>
                      </tr>
                    </>
                  )}
                  {!loading &&
                    data.map((item: any, key: any) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {item.name}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {item.email}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {item.phone}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {item.topic}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {item.message}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <Link to={`/messageforms/detail/${item._id}`}>
                              <BiDetail className="text-[18px] hover:text-primary cursor-pointer" />
                            </Link>
                            <FaRegTrashAlt
                              className="text-[18px] hover:text-primary cursor-pointer"
                              onClick={() => {
                                setShowModal(true);
                                setSelectedId(item._id);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <modal.Frame
          open={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <modal.Head>Remove MessageForm</modal.Head>
          <modal.Body>
            <div className="flex flex-col space-y-2">
              <p className="text-center mb-3">
                Are you sure you want to remove this messageform?
              </p>
              <div className="flex items-center justify-center gap-5">
                <button
                  className="text-white border-2 border-red-400 bg-red-400 rounded shadow-xl py-1 px-4 outline-none focus:border-red-200"
                  onClick={() => handleRemove(selectedId)}
                >
                  {loading && (
                    <svg
                      aria-hidden="true"
                      className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-primary mr-1"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  )}
                  Remove
                </button>
                <button
                  className="text-white border-2 border-slate-400 bg-slate-400 rounded shadow-xl py-1 px-4 outline-none focus:border-slate-200"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </modal.Body>
        </modal.Frame>
      </DefaultLayout>
    </>
  );
};

export default Messages;
