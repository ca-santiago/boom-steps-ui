import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_URI}`;

function verifyFlujoToken(token) {
  return new Promise((resolve, reject) => {
    fetch(`${baseURL}/flujos`, {
      method: 'POST',
      body: JSON.stringify({
        token
      })
    })
      .then(result => {
        if (result.status === 400) {
          return result.json().then(badRequest => {
            console.log(badRequest)
            reject(badRequest);
          })
        }
        if (result.status === 200) {
          resolve();
        } else {
          reject();
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  })
}

function getFlujoById(id) {
  return new Promise((resolve, reject) => {
    fetch(`${baseURL}/flujos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        if (result.status === 400) {
          return result.json().then(badRequest => {
            reject(badRequest);
          })
        }
        if (result.status === 200) {
          resolve(result.json());
        } else {
          reject();
        }
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  });
}

function createNewFlujo({ steps, title, description, completionTime }) {
  return new Promise((resolve, reject) => {
    fetch(`${baseURL}/flujos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        types: steps,
        title,
        completionTime,
        description: description || undefined
      })
    })
      .then(result => {
        if (result.status === 400) {
          return result.json().then(badRequest => {
            console.log(badRequest)
            reject(badRequest);
          })
        }
        if (result.status === 201) {
          resolve(result);
        } else {
          reject();
        }
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  });
}

function GetFlujosPaginated(page = 0) {
  return new Promise((resolve, reject) => {
    fetch(`${baseURL}/flujos`)
      .then(data => {
        if (data.status === 200) {
          resolve(data.json());
        } else {
          reject();
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getContactInfoDetails(flujoId) {
  return new Promise((resolve, reject) => {
    axios.get(`${baseURL}/flujos/${flujoId}/steps/contactInfo`)
      .then(res => {
        resolve(res.data.data);
      })
      .catch(err => {
        if (err.response.status === 404) {
          resolve(null)
          return;
        }
        throw err;
      })
      .catch(reject);
  });
}

function getSignatureDetails(flujoId) {
  return new Promise((resolve, reject) => {
    axios.get(`${baseURL}/flujos/${flujoId}/steps/signature`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        if (err.response.status === 404) {
          resolve(null)
          return;
        }
        throw err;
      })
      .catch(reject);
  });
}

function getFaceIdDetails(flujoId) {
  return new Promise((resolve, reject) => {
    axios.get(`${baseURL}/flujos/${flujoId}/steps/faceId`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        if (err.response.status === 404) {
          resolve(null)
          return;
        }
        throw err;
      })
      .catch(reject);
  });
}

const FlujoService = {
  getFlujoById,
  verifyFlujoToken,
  createNewFlujo,
  GetFlujosPaginated,
  steps: {
    getContactInfoDetails,
    getSignatureDetails,
    getFaceIdDetails
  }
}

export default FlujoService;
