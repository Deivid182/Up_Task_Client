/* eslint-disable react/prop-types */

export default function Alert({ alert, datacy }) {

  return (
    <div
      data-cy={datacy}
      className={`${alert.error ? "from-red-400 to-red-600" : "from-sky-400 to-sky-600"} bg-gradient-to-br text-center p-3 rounded-md uppercase font-bold text-white text-sm my-5 `} >
      {alert.msg}
    </div>
  )
}
