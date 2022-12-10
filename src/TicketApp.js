import React from 'react'
import 'antd/dist/reset.css';
import { SocketProvider } from './context/SocketContext';
import { UiProvider } from './context/UiContext';
import RouterPage from './router/RouterPage';


const TicketApp = () => {
  return (
    <SocketProvider>
      <UiProvider>
       <RouterPage/>
      </UiProvider>
    </SocketProvider>

  )
}

export default TicketApp
 