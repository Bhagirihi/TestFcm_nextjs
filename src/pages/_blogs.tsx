import { useTheme } from 'next-themes';
import { connect } from 'react-redux';
function Blogs(props: any) {
  const { theme, setTheme } = useTheme();

  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='container mx-auto px-6 py-10'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold capitalize text-gray-800 dark:text-white lg:text-3xl'>
            From the blog
          </h1>

          <p className='mx-auto mt-4 max-w-lg text-gray-500'>
            Salami mustard spice tea fridge authentic Chinese food dish salt
            tasty liquor. Sweet savory foodtruck pie.
          </p>
        </div>

        <div className='mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3'>
          <div>
            <div className='relative'>
              <img
                className='h-64 w-full rounded-lg object-scale-down object-center lg:h-80'
                src='https://www.dhruvdave.in/BL-1004/Firebase.png'
                alt=''
              />

              <div className='absolute bottom-0 flex bg-white p-3 dark:bg-gray-900 '>
                <img
                  className='h-10 w-10 rounded-full object-cover object-center'
                  src='https://media.licdn.com/dms/image/D5603AQHeUEXpQMgYJg/profile-displayphoto-shrink_400_400/0/1677776885300?e=1720656000&v=beta&t=0ZBxWVjqoCPnOTOtM-W2nI06Q-CwWpUIGb9_RQs5CPI&auto=format&fit=crop&w=764&q=80'
                  alt='Author_Profile_Pic'
                />

                <div className='mx-4'>
                  <h1 className='text-sm text-gray-700 dark:text-gray-200'>
                    Dhruv Dave
                  </h1>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Software Developer
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h1 className='mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
                Push Notification Integration in React Native
              </h1>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Article Reference:{' '}
                <a href='https://www.dhruvdave.in/blogs/push-notification-integration-in-react-native'>
                  Dhruv Dave
                </a>
              </p>
            </div>

            <hr className='my-6 w-32 text-blue-500' />

            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Step-by-step guide: Implementing React Native push notifications
              with Firebase. Learn how to set up Firebase Cloud Messaging (FCM)
              for push notifications in React Native, and how to send
              notifications from FCM to your app.
            </p>

            <a
              href='https://www.dhruvdave.in/blogs/push-notification-integration-in-react-native'
              className='mt-4 inline-block text-blue-500 underline hover:text-blue-400'
              rel='noopener nofollow noreferrer'
              target='_blank'
            >
              Read more
            </a>
          </div>

          <div>
            <div className='relative'>
              <img
                className='h-64 w-full rounded-lg object-scale-down object-center lg:h-80'
                src='https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                alt=''
              />

              <div className='absolute bottom-0 flex bg-white p-3 dark:bg-gray-900 '>
                <img
                  className='h-10 w-10 rounded-full object-cover object-center'
                  src='https://media.licdn.com/dms/image/D5603AQHeUEXpQMgYJg/profile-displayphoto-shrink_400_400/0/1677776885300?e=1720656000&v=beta&t=0ZBxWVjqoCPnOTOtM-W2nI06Q-CwWpUIGb9_RQs5CPI&auto=format&fit=crop&w=764&q=80'
                  alt='Author_Profile_Pic'
                />

                <div className='mx-4'>
                  <h1 className='text-sm text-gray-700 dark:text-gray-200'>
                    Dhruv Dave
                  </h1>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Software Developer
                  </p>
                </div>
              </div>
            </div>

            <h1 className='mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
              How to Create Firebase Account: step by step guide
            </h1>

            <hr className='my-6 w-32 text-blue-500' />

            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis fugit dolorum amet dolores praesentium, alias nam?
              Tempore
            </p>

            <a
              href='#'
              className='mt-4 inline-block text-blue-500 underline hover:text-blue-400'
            >
              Read more
            </a>
          </div>

          <div>
            <div className='relative'>
              <img
                className='h-64 w-full rounded-lg object-scale-down object-center lg:h-80'
                src='https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
                alt=''
              />

              <div className='absolute bottom-0 flex bg-white p-3 dark:bg-gray-900 '>
                <img
                  className='h-10 w-10 rounded-full object-cover object-center'
                  src='https://media.licdn.com/dms/image/D5603AQHeUEXpQMgYJg/profile-displayphoto-shrink_400_400/0/1677776885300?e=1720656000&v=beta&t=0ZBxWVjqoCPnOTOtM-W2nI06Q-CwWpUIGb9_RQs5CPI&auto=format&fit=crop&w=764&q=80'
                  alt='Author_Profile_Pic'
                />

                <div className='mx-4'>
                  <h1 className='text-sm text-gray-700 dark:text-gray-200'>
                    Dhruv Dave
                  </h1>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Software Developer
                  </p>
                </div>
              </div>
            </div>

            <h1 className='mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
              Testing FCM Push Notification through TestFcm.in
            </h1>

            <hr className='my-6 w-32 text-blue-500' />

            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis fugit dolorum amet dolores praesentium, alias nam?
              Tempore
            </p>

            <a
              href='#'
              className='mt-4 inline-block text-blue-500 underline hover:text-blue-400'
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
const mapStateToProps = (state: any) => {
  console.log('SATE REDUX', state);
  return {
    user: state.main.user,
  };
};

export default connect(mapStateToProps, [])(Blogs);
