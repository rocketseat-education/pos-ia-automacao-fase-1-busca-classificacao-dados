export default async function classificationRequest(method, imgSrc){
    return fetch("http://127.0.0.1:3000/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({method: method, imgPath: imgSrc})
      }).then(resp => resp.json());
}