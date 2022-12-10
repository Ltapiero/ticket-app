
import React, { useContext, useState } from 'react'
import { Button, Col, Divider, Row, Typography } from 'antd'
import{CloseCircleOutlined, RightCircleOutlined} from '@ant-design/icons'

import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { Navigate, useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';

const {Title, Text} = Typography;

export const Escritorio = () => {

  const history = useNavigate()
  useHideMenu(false);

  const [usuario] = useState(getUsuarioStorage())
  const {socket} = useContext( SocketContext )
  const [ticket, setTicket] = useState(null)

  const salir = () => {
    localStorage.removeItem('agente');
    localStorage.removeItem('escritorio');
    history('/ingresar')
  }

  const siguienteTicket = () => {
    socket.emit('siguiente-ticket-trabajar', usuario, (ticket)=>{
      setTicket(ticket)
    })
  }

  if(!usuario.agente || !usuario.escritorio){
    return <Navigate to="/ingresar"/>
  }

  return (
    <>
      <Row>
        <Col xs={12} sm={20}>
            <Title level={2}>{usuario.agente}</Title>
            <Text>Usted está trabajando en el escritorio: </Text>
            <Text type='success'>{usuario.escritorio}</Text>
        </Col>
        <Col xs={12} sm={4} align="right">
          <Button
            danger
            type="primary"
            onClick={salir}
          >
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>

      {
        ticket && (
          <Row>
            <Col>
              <Text>Está atendiendo el ticket número: </Text>
              <Text
                style={{fontSize: 30}}
                type="danger"
              >
                {ticket.numero}
              </Text>
            </Col>
          </Row>
        )
      }

      <Row>
        <Col>
          <Button
              block
              type="primary"
              style={{ marginTop: 16 }}
              onClick={siguienteTicket}
            >
              <RightCircleOutlined />
              Siguiente
          </Button>     
        </Col>
      </Row>

      <Divider/>
    </>
  )
}
