import { useState } from 'react';



export default function HomePage() {
  const [query, setQuery] = useState({});
  const [showResults, setShowResults] = useState(false)
  const onClick = () => setShowResults(!showResults)

  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Form Submit function
  const formSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const { fcmtoken, serverkey, body, title, data } = query
    const FCMData = {
      "to": fcmtoken,
      "notification": {
        "body": body,
        "content_available": true,
        "priority": "high",
        "Title": title
      },
      "data": data
    }

    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=${serverkey}`,
      },
      body: FCMData,
    })
    console.log('formData', formData, query);
  };
  return (

    <form onSubmit={formSubmit}>
      <div className='text-start'>
        <div>
          <div className="mb-3">
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900">Server Key</label>
            <input type="text" id="default-input" placeholder="Server Key" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required onChange={handleParam()} name="serverkey" />
          </div>

          <div className="mb-3">
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900  ">FCM Registration Token (Device Token)</label>
            <input type="text" id="default-input" placeholder="FCM Registration Token (Device Token)" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required onChange={handleParam()} name="fcmtoken" />
          </div>

          <div className="mb-3">
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900  ">Title</label>
            <input type="text" id="default-input" placeholder="Notification Title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required onChange={handleParam()} name="title" />
          </div>

          <div className="mb-3">
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900  ">Body</label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
              id="exampleFormControlTextarea1"
              placeholder="Notification body"
              required
              name="body"
              onChange={handleParam()}
            ></textarea>

          </div>
        </div>
        <p className="text-center text-sm m-4 font-bold text-blue-500" onClick={onClick}>Hide Optional</p>
        {
          showResults &&
          <div>
            <div className="mb-3">
              <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900  ">Click Action URL - (optional)</label>
              <input type="url" id="default-input" placeholder="URL to redirect" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleParam()} name="redirect" />
            </div>

            <div className="mb-3">
              <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900  ">Icon URL - (optional)</label>
              <input type="url" id="default-input" placeholder="Icor url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleParam()} name="icon" />
            </div>



            <div className="mb-3">
              <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900  ">Data - (optional)</label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                id="exampleFormControlTextarea1"
                placeholder="Must be JSON Object like { 'key': 'value' }"
                name="data"
                onChange={handleParam()}
              ></textarea>

            </div>
          </div>
        }
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:w-80 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4">Push Notification</button>

      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:w-36 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Locally</button>


    </form>



  );
}
