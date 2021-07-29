
export function setToken (){
    const config = {
            headers: { 
                'auth-token': localStorage.getItem('token'),
                Accept: 'application/json'
            }
        };
    return config;    
}

export const api_url = process.env.VUE_APP_API_URL;

export function readBufferImg(imagedata) {
    var bytes = new Uint8Array(imagedata.data);
    var binary = bytes.reduce(
      (data, b) => (data += String.fromCharCode(b)),
      ""
    );
    return binary;
  }
