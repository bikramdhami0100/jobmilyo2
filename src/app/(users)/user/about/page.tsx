

import React from 'react'
import { HeroAbout } from '../usercomponents/HeroAbout'
import AboutExpert from '../usercomponents/AboutExpert'
import OurTeams from '../usercomponents/OurTeams'

function About() {
  return (
 <div className=' w-[100%] h-full justify-center items-center m-auto'>
      <HeroAbout/>
      <AboutExpert/>
      <OurTeams/>
 </div>
  )
}

export default About
