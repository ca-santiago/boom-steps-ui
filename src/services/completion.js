import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_URI}/completion`;

function startFlujo(id, passcode) {
  return new Promise((resolve, reject) => {
    axios.post(`${baseURL}/start/${id}`, { passcode })
      .then((payload) => {
        resolve({
          data: payload.data,
          locked: false,
          forbidden: false,
        });
      })
      .catch(({ response }) => {
        if (response.status < 500) {
          resolve({
            data: null,
            locked: response.status === 409,
            forbidden: response.status === 403,
          });
          return;
        }
        reject(err);
      });
  });
}

/**
 * @returns resultType: 'ERROR' | 'CANT_FINISH' | 'OK'
 * @returns flujo: Flujo
 * @description ERROR means the flujo cannot be compleated becase of invalid token (probably no longer valid), already closed or not started yet
 * @description CANT_FINISH means the flujo has incompleted steps
 */
function finishFlujo({ id, token }) {
  return new Promise((resolve, reject) => {
    axios.post(`${baseURL}/${id}/finish`, { token })
      .then(result => {
        const { status, data } = result;
        if (status === 201 || status === 200) {
          resolve(data)
        } else {
          reject(result);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

function putFaceId({ flujoId, token }) {
  return new Promise((resolve, reject) => {
    axios.put(`${baseURL}/${flujoId}/faceid`, { token, flujoId })
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
    fetch(`${baseURL}/${flujoId}/contactInfo`, {
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
    axios.put(`${baseURL}/${flujoId}/signature`, form)
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

const CompletionService = {
  startFlujo,
  finishFlujo,
  putFaceId,
  putContactInfo,
  putSignature,
}

export default CompletionService;