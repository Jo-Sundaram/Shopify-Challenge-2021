import React, { useEffect, useState } from "react";
import {ENDPOINT,URL} from "../../constants.js";
import download from "js-file-download";
import axios from 'axios';

const Repository = () => {
    const [files,setFiles] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: ENDPOINT.IMAGES_GET, 
            params: {"filter":1},
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
          .then((res) => {
              setFiles(res.data);
          })
          .catch((err) => {
              console.error(err);
              if(err){
                alert("You are not logged in");
                window.location = '/';
              }
          });

    },[]);


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

  return <main id="mainContent">
    <div className = "container">
      <div>
        <h3>Repository</h3>

        <div>
            <table>
              <th>User</th>
              <th>File</th>
              <th>Visibility</th>

                {files.map((file) => (
                    <tr>
                        <td>{file.user}</td>
                        <td>{file.name}</td>
                        <td>{file.visibility===1?"Public":"Private"}</td>
                        <td>
                            <button onClick = {()=>{handleDownload(file)}}>Download</button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>

      </div>
    </div>
  </main>;
}
export default Repository;
