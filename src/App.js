import React, { useEffect,useState } from 'react';
import { Container } from 'react-bootstrap';
import {
   Routes,
   Route,
   Navigate,
   useNavigate,

 } from "react-router-dom";


import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Homescreen from './screens/homescreen/Homescreen';
import Loginscreen from './screens/loginScreen/Loginscreen';

import './_app.scss';
import { useSelector } from 'react-redux';
import WatchScreen from './screens/watchScreen/WatchScreen';
import SearchScreen from './screens/SearchScreen'
import SubscriptionsScreen from './screens/subscriptionsScreen/SubscriptionsScreen'
import ChannelScreen from './screens/channelScreen/ChannelScreen'

const Layout = ({ children }) => {
   const [sidebar, toggleSidebar] =useState(false);

   const handleToggleSidebar = () => toggleSidebar(value => !value);

   return (
      <>
         <Header handleToggleSidebar={handleToggleSidebar} />
         <div className='app__container'>
            <Sidebar
               sidebar={sidebar}
               handleToggleSidebar={handleToggleSidebar}
            />
            <Container fluid className='app__main'>
               {children}
            </Container>
         </div>
      </>
   );
};



const App = () =>{
   const { accessToken, loading } = useSelector(state => state.auth)

   const nevigate = useNavigate()

   useEffect(() => {
      if (!loading && !accessToken) {
         nevigate('/auth')
      }
   }, [accessToken, loading, nevigate])

   return (
     
      
      <Routes>
        {/* Route for the home screen */}
        <Route path="/" element={<Layout><Homescreen /></Layout>} />

        {/* Route for the authentication screen */}
        <Route path="/auth" element={<Loginscreen />} />

        {/* Route for the search results 
        <Route path="/search/:query" element={<Layout><SearchScreen/></Layout>} />*/}

        <Route path="/watch/:id" element={<Layout><WatchScreen/></Layout>} />

        {/*<Route path='/feed/subscriptions'
          element = { <Layout>
               <SubscriptionsScreen />
            </Layout>}/>*/}
        
         {/* <Route path='/channel/:channelId'
            element ={<Layout>
               <ChannelScreen />
            </Layout>}/>*/}
         
        {/* Catch-all route for unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
   
      
   );
};

export default App;
