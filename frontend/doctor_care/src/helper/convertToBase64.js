
export const getBase64 = file =>
    new Promise((resolve,reject) => {
        
        let reader = new FileReader();
  
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = error => reject(error);
    });