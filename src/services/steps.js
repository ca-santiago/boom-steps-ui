import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_URI}/flujos`;
const baseURLCompletion = `${import.meta.env.VITE_API_URI}/completion`;

function putFaceId({ flujoId, token }) {
  return new Promise((resolve, reject) => {
    axios.put(`${baseURLCompletion}/${flujoId}/faceid`, { token, flujoId })
      .then((result) => {
        if (result.status === 400) {
          result.json().then(payload => {
            console.log(payload);
          })
        }
        if (result.status !== 200) {
          reject();
        }
        resolve(result.data);
      })
      .catch(err => {
        console.log({ err });
        reject(err)
      });
  });
}

function putContactInfo({ token, flujoId, email, fullname, birthDate, bornPlace, phone }) {
  return new Promise((resolve, reject) => {
    fetch(`${baseURLCompletion}/${flujoId}/contactInfo`, {
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

function putSignature({ flujoId, token, file, filename }) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.set('accessToken', token);
    form.append('file', file, filename);
    axios.put(`${baseURLCompletion}/${flujoId}/signature`, form)
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
  putFaceId,
  putContactInfo,
  putSignature,
}