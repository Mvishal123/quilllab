import React, { PropsWithChildren } from 'react'

const Template = ({children}: PropsWithChildren) => {
  return (
    <div className="h-screen flex p-6 justify-center sm:items-center ">
        {children}
    </div>
  )
}

export default Template