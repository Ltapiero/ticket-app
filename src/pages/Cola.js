import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd';
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import { getUltimos } from '../helpers/getUltimos';


const{Title, Text} = Typography;

export const Cola = () => {

  useHideMenu(true);

  const {socket} = useContext(SocketContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    
    socket.on('ticket-asignado', (asignados) =>{
      setTickets(asignados)
    })

    return () => {
      socket.off('ticket-asignado')
    }
    
  }, [socket])

  useEffect(() => {
    
    getUltimos().then(setTickets);

  }, [])
  
  

  return (
    <>
      <Title level={2} style={{textAlign: 'center'}}>Atendiendo al cliente</Title>
      <Row>
        <Col xs={24} sm={12}>
          <List
            dataSource={tickets.slice(0,3)}
            renderItem={item=>(
              <List.Item style={{justifyContent: 'center'}}>
                <Card
                  style={{marginTop: 16, width: 300}}
                  actions={[
                    <Tag color='volcano'>{item.agente}</Tag>,
                    <Tag color='magenta'>Escritorio: {item.escritorio}</Tag>
                  ]}

                >
                  <Title>No. {item.numero}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>

        <Col xs={24} sm={12}>
          <Divider>Historial</Divider>
          <List
            dataSource={tickets.slice(3)}
            style={{justifyItems: 'center'}}
            renderItem={ item => (
              <List.Item style={{maxWidth: 400,margin: '0 auto'}}>
                <List.Item.Meta
                    title={`Ticket No. ${item.numero}`}

                    description={
                      <>
                        <Row justify="space-between">
                          <Col>
                            <Text type='secondary'>En el escritorio: </Text>                          
                          </Col>
                          <Col>
                            <Tag color='magenta'>{item.numero}</Tag>
                          </Col>

                        </Row>

                        <Row justify="space-between">
                          <Col>
                            <Text type='secondary'>Agente: </Text>                   
                          </Col>

                          <Col>
                            <Tag color='volcano'>{item.agente}</Tag>                    
                          </Col>
                        </Row>

                      </>
                    }
                />
              </List.Item>
            )}
          />
        </Col>

      </Row>
     
    </>
  )
}
