import React, { useContext } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { Cola, CrearTicket, Escritorio, Ingresar } from '../pages';
import { UiContext } from '../context/UiContext';
const { Header, Content, Sider } = Layout;

const RouterPage = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { ocultarMenu } = useContext(UiContext)

  return (
    <BrowserRouter>
      
      <Layout style={{height: '100vh'}}>
        <Sider 
          collapsedWidth='0' 
          breakpoint='md'
          hidden={ocultarMenu}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key='1' icon={<UserOutlined/>}>
              <Link to="/ingresar">
                Ingresar  
              </Link>    
            </Menu.Item>

            <Menu.Item key='2' icon={<VideoCameraOutlined/>}>
              <Link to="/cola">
                Cola de Tickets  
              </Link>
            </Menu.Item>

            <Menu.Item key='3' icon={<UploadOutlined/>}>
              <Link to="/crear">
                Crear Tickets
              </Link>
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content
            style={{
              margin: '24px 16px 0',
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Routes>
                <Route path='/'  element={<Ingresar/>}/>
                <Route path='/ingresar'  element={<Ingresar/>}/>
                <Route path='/cola'  element={<Cola/>}/>
                <Route path='/crear'  element={<CrearTicket/>}/>
                <Route path='/escritorio'  element={<Escritorio/>}/>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>

    </BrowserRouter>
  )
}

export default RouterPage
