import { useState } from "react";
import { NavLink } from "react-router-dom";

function UploadImage() {
  const [image, setImage] = useState({
    value: ''
  });
  console.log(image.imagePreview);

  const onFileHandler = async(e, setInput) => {
    const files = e.target.files;
    console.log(files);
    let imagePreview = [];
    for(const file of files) {
      try {
        const b64 = await generateBase64FromImage(file);
        if(b64) {
          imagePreview.push(b64);
        }
      }
      catch(err) {
        console.log(err);
      };
    };
    console.log(imagePreview);
    setInput(prev => ({
      ...prev,
      value: files,
      imagePreview: imagePreview
    }));
  };

  const generateBase64FromImage = imageFile => {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
      reader.onload = e => resolve(e.target.result);
      reader.onerror = err => reject(err);
    });
  
    reader.readAsDataURL(imageFile);
    console.log(promise);
    return promise;
  };

  const sendImageHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    for(const imageUrl of image.value) {
      formData.append('image', imageUrl);
    };
    // console.log(image.value);
    try {
      const response = await fetch('http://localhost:5000/images/upload', {
        mode: 'cors',
        method: 'POST',
        body: formData
      });
      const resolve = await response.json();
      console.log(resolve);
    } catch(err) {
      console.log(err);
    };
  };

  return (
    <div className="App">
      <NavLink to='/'>Home</NavLink>
      <form>
        <input 
          type="file"
          accept="image/png, image/gif, image/jpeg" 
          onChange={e => onFileHandler(e, setImage)}
          multiple={true}
        />
        <button onClick={sendImageHandler}>Send Images</button>
      </form>
      <div style={{
        width: '100%',
        height: '100px',
        marginTop: '10px',
      }}>
        {image.imagePreview && 
          image.imagePreview.map((value, index) => 
            <div 
              key={index}
              style={{ 
                backgroundImage: `url('${value}')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '100%'
              }}
              alt={index}
            />
          )
        }
      </div>
    </div>
  );
}

export default UploadImage;
