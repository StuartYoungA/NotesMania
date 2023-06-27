import React, { useContext, useEffect } from 'react'
import noteContext from "../Context/Notes/noteContext";
const About=()=> {
 
  return (

    <div>
      <div className="container mt-5">
    <h1>About Us</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique quam non mi semper, vitae tincidunt erat lobortis. Nam ut fermentum odio. Proin et arcu at justo consectetur egestas non eget lorem. Integer blandit metus id turpis pulvinar commodo.</p>
    <p>Suspendisse interdum ante eu metus fringilla, ac euismod sapien vulputate. Sed in cursus orci, ac fringilla massa. Sed non nibh risus. Aliquam semper, arcu id fringilla consequat, odio nunc vestibulum sapien, nec laoreet sem neque at mauris.</p>
    <p>Donec in sapien tristique, efficitur mauris et, ultrices dolor. Phasellus tincidunt eu mi vel ultricies. Sed consectetur arcu id magna venenatis feugiat. Etiam fringilla nulla ac vulputate condimentum.</p>
  </div>

  {/* <!-- Footer --> */}
  <footer className="footer mt-auto py-3 bg-light">
    <div className="container text-center">
      <span className="text-muted">© 2023 Notes Mania. All rights reserved.</span>
    </div>
  </footer>
    </div>
  )
}
export default About   