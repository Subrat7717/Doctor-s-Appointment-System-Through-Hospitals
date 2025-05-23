import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Hospitals from '../components/Hospitals'


const Home  = () => {
  return (
    <div>
       <Header/>
       <Hospitals/>
       <SpecialityMenu/>
       <TopDoctors/>
       <Banner/>
       
    </div>
  )
}
export default Home
