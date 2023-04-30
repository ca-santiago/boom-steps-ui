import axios from 'axios';

const baseURL = `http://localhost:3300/flujos`;

function CreateFaceId({ flujoId, token, file, filename }) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.set('accessToken', token);
    form.append('file', file, filename);

    axios.put(`${baseURL}/${flujoId}/steps/faceid`, form)
      .then((result) => {
        console.log('Faceid creation result');
        console.log({ result });
        if (result.status === 400) {
          result.json().then(payload => {
            console.log(payload);
          })
        }
        if (result.status !== 200) {
          reject();
        }
        resolve(result);
      })
      .catch(err => {
        console.log({ err });
        reject(err)
      });
  });
}

function CreatePersonalData({ token, flujoId, email, fullname, birthDate, bornPlace, phone }) {
  return new Promise((resolve, reject) => {
    fetch(`${baseURL}/${flujoId}/steps/info`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: token, fullName: fullname, birthDate,
        bornPlace, phone, email,
      }),
    })
      .then(result => {
        console.log('Status: ', result.status);
        if (result.status === 400) {
          return result.json().then(badRequest => {
            console.log(badRequest)
            reject(badRequest);
          })
        }
        if (result.ok === false) return reject();
        resolve();
      })
      .catch(reject);
  });
}

function CreateSignature({ flujoId, token, file, filename }) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.set('accessToken', token);
    form.append('file', file, filename);

    axios.put(`${baseURL}/${flujoId}/steps/signature`, form)
      .then((result) => {
        console.log('Signature creation result');
        console.log({ result });
        if (result.status === 400) {
          result.json().then(payload => {
            console.log(payload);
          })
        }
        if (result.status !== 200) {
          reject();
        }
        resolve(result);
      })
      .catch(reject);
  });
}


export const StepServices = {
  CreateFaceId,
  CreateSignature,
  CreatePersonalData
}