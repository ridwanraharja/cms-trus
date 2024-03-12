import React, { useEffect, useState } from 'react';
import TableThree from '../../../../components/Tables/TableThree';
import DefaultLayout from '../../../../layout/DefaultLayout';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { query } from '../../../../utils/axiosUtil';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineTopic } from 'react-icons/md';
import { MdOutlineWork } from 'react-icons/md';
import { Modal as modal } from '../../../../components/Modal/Modal';
import { useSelector } from 'react-redux';

const Topics: React.FC = () => {
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
        `/api/topic/deletetopic/${id}/${currentUser._id}`,
      );

      if (res.success === false) {
        setLoading(false);
        return setErrorMessage(res.message);
      }

      setLoading(false);
      if (res.success === true) {
        getTopics();
        setShowModal(false);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const getTopics = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res: any = await query('GET', '/api/topic/gettopics');
      if (res.success === false) {
        setLoading(false);
        return setErrorMessage(res.message);
      }

      setLoading(false);
      if (res.success === true) {
        setData(res.topics);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  console.log(data);
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Topics" />
        <div className="flex flex-col gap-6">
          <div>
            <Link
              to="/topics/create"
              className=" inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-3"
            >
              <span>
                <MdOutlineTopic className="text-[20px]" />
              </span>
              Add Topics
            </Link>
          </div>

          <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  {!loading && (
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Content
                      </th>

                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Action
                      </th>
                    </tr>
                  )}
                  {loading && (
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <td className="text-center" colSpan={2}>
                        <div className="py-4 px-4 animate-pulse h-7 bg-slate-400 rounded"></div>
                      </td>
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
                            {item.content}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <Link to={`/topics/update/${item._id}`}>
                              <FaRegEdit className="text-[18px] hover:text-primary cursor-pointer" />
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
          <modal.Head>Remove Topic</modal.Head>
          <modal.Body>
            <div className="flex flex-col space-y-2">
              <p className="text-center mb-3">
                Are you sure you want to remove this topic?
              </p>
              <div className="flex items-center justify-center gap-5">
                <button
                  className="text-white border-2 border-red-400 bg-red-400 rounded shadow-xl py-1 px-4 outline-none focus:border-red-200"
                  onClick={() => handleRemove(selectedId)}
                >
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

export default Topics;
