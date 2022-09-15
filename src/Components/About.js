import React from 'react';

//import noteContext from '../context/notes/noteContext';
const About = () => {
    // const a = useContext(noteContext)
    // useEffect(()=>{
    //     a.update();
    //     // eslint-disable-next-line
    // },[])
    let image = require('./myImage.jpg')
    return (
        <div>
            <h2 className='my-3'><u>This App is for storing your personal notes</u></h2>
            <div className="card mb-3 my-5 mx-5" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                    <div className="myimage col-md-4">
                        <img src={image} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Ankit Jha</h5>
                            <p className="card-text">Hii I am a technological enthusiast engineer i made this app so that you can write your personal notes here safe and sound whenever you want you can update your notes and i made this app perfectly secure so that no one can access your private information</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About