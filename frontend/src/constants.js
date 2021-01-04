const PORT = "http://localhost:5000";
const APP = "http://localhost:3000";

const ENDPOINT = {
  MASTERDETAIL: "/api/masterdetail",
  USERS: PORT + "/users",
  PING: PORT + "/ping",
  IMAGES: PORT + "/images/",
  IMAGES_GET: PORT + "/images/get",
  IMAGES_USER: PORT + "/images/get-user",
  IMAGES_DELETE: PORT + "/images/delete",
  UPLOAD: PORT + "/images/upload"
};

const URL = {
  REPOSITORY: APP + "/Repository"
}


const ERROR_MESSAGE = {
  MASTERDETAIL_GET: "Request to get master detail text failed:",
};

export {ENDPOINT,URL, ERROR_MESSAGE};
