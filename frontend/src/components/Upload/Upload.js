import React, { useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import { ERROR_MESSAGE, ENDPOINT } from "../../constants";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [visibility, setVisible] = useState(1);
  const { register, handleSubmit } = useForm();

  useEffect(()=>{
    
      axios({
          method: 'get',
          url: ENDPOINT.IMAGES_USER, 
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
      })
        .then((res) => {
            
            res.data.forEach(element => {
              setFiles(files => [...files, element]);
            });
        
      })
      .catch((err) => {
          console.error(err);
          if(err){
            alert("You are not logged in");
            window.location = '/';
          }
      });

    },[]);


    const handleChecked=(e)=>{
      setVisible(parseInt(e.target.value));
      console.log(visibility);
  }


  const onSubmit=(e)=>{
      const formData = new FormData();

      console.log(e.image);
      let images = e.image

      for(let i = 0; i < images.length; i++){
        formData.append('file',images[i]);
        formData.append('name', images[i].name);
      }
      formData.append('visibility', visibility);

      axios({
        method: 'post',
        url: ENDPOINT.UPLOAD, 
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(res=>{

        res.data.forEach(element => {
          setFiles(files => [...files, element]);
        });

      }).catch(err=>{
        console.log(err);
        alert("Only images can be uploaded");
      });

  }


  const handleDownload = (file) => {
      axios({
          url: ENDPOINT.IMAGES_GET + '/'+file.id,
          method: 'GET',
          responseType: 'blob', // important
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }).then((response) => {

          const url = window.URL.createObjectURL(new Blob([response.data],{type:'image/*'}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', file.name);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);  
          
        }).catch((err)=>{
          console.log(err);
        });
  }

  const handleDelete=(file)=>{
      axios({
          method: 'DELETE',
          url: ENDPOINT.IMAGES_DELETE, 
          data: {id: file.id, name: file.name},
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
      })
        .then((res) => {
            
            console.log(res);
      })
      .catch((err) => {
          console.error(err);
          if(err){
            alert("You are not logged in");
            window.location = '/';
          }
      });
    
  }
  
  return (
    <main id="mainContent">
      <div className="container">
        <form onSubmit = {handleSubmit(onSubmit)}>
          <input type="file" name = "image" class="form-control" multiple ref = {register}/>
          <input type="radio" value="0" name="visibility" onChange = {handleChecked}  checked = {visibility===0}/> Private
          <input type="radio" value="1" name="visibility" onChange = {handleChecked} checked = {visibility===1}/> Public
          <br>
          </br><button>Upload</button> .jpg .jpeg .png
        </form>
        <div>
          <table>

            <th>File Name</th>
            <th>Visibility</th>

            {files.map((file) => (
              <tr>
                <td>{file.name}</td>
                <td>{file.visibility===1?"Public":"Private"}</td>
                <td>
                <button onClick = {()=>{handleDownload(file)}}>Download</button>

                    <button onClick = {()=>{handleDelete(file)}}>Delete</button>
                </td>

              </tr>
            ))}

          </table>
        </div>

      </div>
  
    </main>
  );
}

export default Upload;