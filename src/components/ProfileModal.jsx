import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import CloseIcon from '../icons/CloseIcon'
import Alert from './Alert'
import { useProjects } from '../hooks/useProjects'
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-hot-toast'

const ProfileModal = ({ isOpen, onClose }) => {

  const { alert } = useProjects()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { auth, updateInfo } = useAuth()
  const [isChecked, setIsChecked] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    setName(auth.name)
    setEmail(auth.email)
  }, [auth])

  const handleIsChecked = (event) => {
    setIsChecked(event.target.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([name, email].includes("")) {
      return toast.error('All fields are required')
    }

    await updateInfo({ name, email, newPassword, currentPassword })
    toast.success('Profile updated')
    setNewPassword('')
    setCurrentPassword('')
  }

  const { msg } = alert

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <CloseIcon />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    Profile
                  </Dialog.Title>

                  {msg && <Alert alert={alert} />}

                  <form className="my-10 space-y-2" onSubmit={handleSubmit}>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="John Doe"
                      className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example.email.com"
                      className="border-2 w-full p-2  placeholder-gray-400 rounded-md"
                    />
                    <div className="flex items-center">
                      <input
                        id="link-checkbox"
                        checked={isChecked}
                        onChange={handleIsChecked}
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                      />
                      <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Update Password
                      </label>
                    </div>
                    {isChecked && (
                      <div className='space-y-6'>
                        <input
                          type="password"
                          className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <input
                          type="password"
                          className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    )}
                    <input
                      type="submit"
                      value={"Update"}
                      className="bg-sky-600 hover:bg-sky-700 w-full text-white capitalize p-3 rounded-md cursor-pointer mt-2 transition-colors text-sm"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ProfileModal