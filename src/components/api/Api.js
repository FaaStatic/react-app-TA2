import axios from "axios";


export const Api = axios.create({
    baseURL :'https://classfication-method-batik-dev.herokuapp.com/',
    headers: {
        "Content-Type": "multipart/form-data",
      },
});