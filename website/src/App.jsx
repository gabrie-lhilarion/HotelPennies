
import './App.css'



import InstallButton from "./components/install/InstallButton";
import IconComponent from "./components/icons/IconComponent";
import ThemeToggle from "./components/theme/ThemeToggle"

import SimpleSlider from './components/slider/SlickSlider';



function App() {

  return (
    <>
      <section>
        <header id='top-header' className='flex text-emerald-950 justify-between w-[100%] dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950 border-b-indigo-500  p-2'>

          <div>
            logo here
          </div>

          <nav className='flex w-[700px] justify-between'>
            <ul className='top-links flex justify-around w-[450px]'>
              <li className='bg-emerald-100 text-emerald-950 dark:bg-emerald-800 dark:text-emerald-200'>List a hotel</li>
              <li className='bg-emerald-100 text-emerald-950 dark:bg-emerald-800 dark:text-emerald-200 pl-6 pr-6'>List a short let</li>
              <li className='bg-emerald-100 text-emerald-950 dark:bg-emerald-800 dark:text-emerald-200 '>Become an affiliate</li>
            </ul>

            <ul className=' flex justify-between w-[150px]'>
              <li className='p-2 flex text-emerald-950 dark:text-emerald-200'>
                <IconComponent icon="user" size={20} /> <em className='text-sm ml-1'>GUEST</em>
              </li>
              <li className='p-1'>
                <ThemeToggle />
              </li>
            </ul>
          </nav>

        </header>
      </section>

      <section className='m-0 p-0'>
        <div id='slider' className='w-[100%] m-auto bg-emerald-300 overflow-hidden'>
          <SimpleSlider />
        </div>
      </section>

      <section id='booking-controll' className='relative h-[200px] bg-red-500'>
        <article className='absolute h-[100px] top-[-100px] bg-green w-[100%]'>
          <div className='w-[70%] h-[200px] bg-emerald-200 m-auto rounded-sm'>
            settings
          </div>
        </article>

        <div>
          HELLO
        </div>
      </section>

      <section id="widgets" className='bg-green-400'>
        STATES
      </section>
      <InstallButton />


    </>
  )
}

export default App
