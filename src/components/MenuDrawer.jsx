
import { Transition, Dialog } from '@headlessui/react'
import { Fragment } from 'react'
import CloseIcon from '../icons/CloseIcon'
import { Link } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'
import { useAuth } from '../hooks/useAuth'

const MenuDrawer = ({ isOpen, onClose }) => {

  const { logOutProjects, setProfileModal } = useProjects();
  const { logOut } = useAuth()

  const handleLogOut = () => {
    logOutProjects()
    logOut()
    localStorage.removeItem("token")
  }

  return (
    <Transition
      as={Fragment}
      show={isOpen}
    >
      <Dialog as={'div'} className={"relative z-50 md:hidden"} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className='fixed inset-0 bg-black bg-opacity-20' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full'>
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel
                  className="pointer-events-auto w-screen max-sm:max-w-xs max-w-sm"
                >
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl py-6 px-4 sm:px-6'>
                    <div className='flex items-center justify-between h-12'>
                      <h2
                        className="cursor-pointer max-md:text-2xl my-0 text-4xl text-sky-500 font-black md:mb-0">
                        Up Task
                      </h2>
                      <button
                        type='button'
                        onClick={onClose}
                        className='rounded-md 
                            bg-white 
                            flex 
                            items-center 
                            justify-center 
                            text-slate-gray 
                            hover:text-coral-red 
                            hover:focus:outline-none'
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <div className='relative flex-1 mt-6'>
                      <div className='flex flex-col gap-y-4'>

                        <Link to={"/projects"}
                          onClick={onClose}
                          className="uppercase font-bold p-2 rounded-full outline-none hover:bg-neutral-200 transition-colors ">
                          Projects
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            onClose()
                            setProfileModal(true)
                          }}
                          className="text-start uppercase font-bold outline-none p-2 rounded-full hover:bg-neutral-200 transition-colors">
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            onClose()
                            handleLogOut()
                          }}
                          className="text-white text-sm bg-sky-500 p-3 rounded-full uppercase font-bold">
                          SignOut
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default MenuDrawer