import { useState } from "react";
import { connect } from "react-redux"

import Example from '../pages/_localItem'
import { setInfo, setpopup } from "../../redux/actions/main"

import Delete from '~/svg/Delete.svg';
import Email from '~/svg/Email.svg';
import Testnotification from '~/svg/Testnotification.svg';


function EmailPage(props: any) {
  const { name, setInfo, setpopup } = props
  const [data, setdata] = useState('')
  // useEffect(() => {
  //   const data = console.log("DATa ----------", props,)

  // }, [props])
  const str = 'John Wick';
  const firstChar = str.charAt(0);

  return (

    <div className='flex flex-col items-center justify-center'>
      <Email className='h-5/6  w-7/12' width='60%' height='0' />
      <h1 className='p-8 text-4xl font-bold leading-relaxed'>
        Just a simple tool to test your firebase push notifications.
      </h1>
      <Example />

      <div className="p-2 w-full  bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold leading-none text-gray-900 dark:text-white">Saved Requests</h3>
          <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
          </a>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">

            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 dark:bg-slate-400  border-slate-400 border-2 w-11 h-11 rounded-full justify-center items-center flex">

                  <h3 className="w-8 h-8 rounded-full bold " >{firstChar}</h3>
                </div>
                <div className="flex-1 ">
                  <p className="text-md font-medium text-gray-900 truncate dark:text-white">
                    Item saved name
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Notification Title
                  </p>

                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Delete className='flex h-8 w-8 fill-current items-center text-center' />
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Testnotification className='flex h-8 w-8 fill-current items-center text-center' />
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 dark:bg-slate-400  border-slate-400 border-2 w-11 h-11 rounded-full justify-center items-center flex">

                  <h3 className="w-8 h-8 rounded-full bold " >{firstChar}</h3>
                </div>
                <div className="flex-1 ">
                  <p className="text-md font-medium text-gray-900 truncate dark:text-white">
                    Item saved name
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Notification Title
                  </p>

                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Delete className='flex h-8 w-8 fill-current items-center text-center' />
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Testnotification className='flex h-8 w-8 fill-current items-center text-center' />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>

  );
}
const mapStateToProps = (state: any) => {
  return { name: state.main.name }
}

const mapDispatchToProps = {
  setInfo,
  setpopup
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailPage)