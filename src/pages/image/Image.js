import { useEffect, useState } from 'react';
import './Image.css';
import download from '../../util/download';
import { NavLink } from 'react-router-dom';

const Image = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const makeAPICall = async() => {
      const response = await fetch('http://localhost:5000/images/get');
      const resolve = await response.json();
      console.log(resolve.data);
      setImages(resolve.data);
    };
    makeAPICall();
  }, []);

  const downloadHandler = async(e) => {
    e.preventDefault();
    console.log(e.target.id);
    try {
      const response = await fetch('http://localhost:5000/' + e.target.id);
      download(response, e.target.id.split('/')[1]);
      console.log(response);
    } catch(err) {
      console.log(err);
    };
  };

  return (
    <div>
      <nav className='nav'>
        <NavLink to='/upload'>Upload</NavLink>
      </nav>
      <ul className='image-list'>
        {images.length !== 0 && 
          images.map((value, index) =>
            <li style={{
              width: '100%',
              height: '100px',
              marginTop: '10px',
              listStyleType: 'none',
              display: 'flex',
              gap: '20px'
            }}>
              <a 
                key={index}
                style={{ 
                  backgroundImage: `url('http://localhost:5000/${value}')`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  width: '100px',
                  border: '1px solid transparent',
                  objectFit: 'cover',
                  objectPosition: 'center center'
                }}
                href={'http://localhost:5000/' + value}
                target='_blank'
                alt={index}
              />
              <button 
                onClick={downloadHandler}
                id={value}
              >Download</button>
            </li>
          )
        }
        {images.length === 0 && <h1>No Images Found!</h1>}
      </ul>
    </div>
  );
};

export default Image;