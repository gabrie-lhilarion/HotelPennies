
import './App.css'



import InstallButton from "./components/install/InstallButton";
import IconComponent from "./components/icons/IconComponent";
import ThemeToggle from "./components/theme/ThemeToggle"

import SimpleSlider from './components/slider/SlickSlider';



function App() {

  return (
    <>
      <section>
        <header
          id='top-header'
          className='flex text-emerald-950 dark:text-emerald-300 justify-between w-[100%]  bg-emerald-50 dark:bg-emerald-950 border-b-indigo-500  p-2'>

          <div>
            logo here
          </div>

          <nav className='flex w-[700px] justify-between'>
            <ul className='top-links flex justify-around w-[450px]'>
              <li className='bg-emerald-100 text-emerald-950 dark:bg-emerald-800 dark:text-emerald-200'>List a hotel</li>
              <li className='bg-emerald-100 text-emerald-950 dark:bg-emerald-800 dark:text-emerald-200 pl-6 pr-6'>List a short let</li>
              <li className='bg-emerald-100 text-emerald-950 dark:bg-emerald-800 dark:text-emerald-200 '>Become an affiliate</li>
            </ul>

            <ul className=' flex justify-between w-[190px]'>
              <li className='p-2 flex'>
                <IconComponent icon="user" size={20} /> <em className='text-sm ml-1'>Login / Register</em>
              </li>
              <li className='p-1'>
                <ThemeToggle />
              </li>
            </ul>
          </nav>

        </header>
      </section>

      <section className='m-0 p-0 '>
        <div id='slider' className='w-[100%] m-auto bg-emerald-300 overflow-hidden'>
          <SimpleSlider />
        </div>
      </section>

      <section id='booking-controll' className='relative h-[75px]'>
        <article className='absolute h-[100px] top-[-125px] w-[100%]'>
          <div className='w-[70%] h-[250px] bg-emerald-50 m-auto dark:bg-emerald-800 rounded-sm shadow-xl p-8'>

            <div>
              <ul className='flex w-[550px] uppercase'>
                <li className='bg-emerald-100 p-3 w-[150px] text-center'>Hotel</li>
                <li className='bg-emerald-100 p-3 w-[150px] text-center'>Short let</li>
              </ul>

            </div>

            <div className='border-2 border-emerald-300'>
              <div className='duration-rap flex p-1 bg-red justify-between'>
                <div className='p-3 flex-1'>
                  <p className='bg-white rounded-sm flex border-1 border-emerald-300 '>
                    <span className='p-3'>
                      <IconComponent icon="location" size={24} />
                    </span>
                    <input type='text' placeholder='Enter city, state or region' className='bg-white p-2 m-1  flex-1' />
                  </p>
                  <div className='duration flex justify-between pt-2'>

                    <p className='bg-emerald-50 flex flex-1'>
                      <span className='block w-[48%] flex p-3  rounded-tl-full rounded-bl-full border-1 border-emerald-300'>
                        <em>CHECK IN</em>
                        <input type="date" />
                      </span>
                      <span className='block w-[48%] flex p-3  rounded-tr-full rounded-br-full border-1 border-emerald-300'>
                        <em>CHECK OUT</em>
                        <input type="date" />
                      </span>
                    </p>

                    <p className='w-[36%]'>
                      people
                    </p>
                  </div>


                </div>

                <div className='p-5 bg-emerald-100 text-emerald-950 cursor-pointer dark:text-emerald-300 w-[130px] rounded-full grid place-items-center'>
                  FIND
                  <IconComponent icon="search" size={40} />
                </div>

              </div>
            </div>

          </div>
        </article>


      </section>

      <section id="widgets" className='bg-green-400'>
        <p className='buy-food bg-green-300'>
          BUY FOOD
        </p>
      </section>
      <InstallButton />


    </>
  )
}

export default App
