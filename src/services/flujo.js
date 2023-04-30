const baseURL = `http://localhost:3300/flujos`;

function verifyFlujoToken(token) {
  return new Promise((resolve, reject) => {
    fetch(`${baseURL}/`, {
      method: 'POST',
      body: JSON.stringify({
        token
      })
    })
      .then(result => {
        console.log('Status: ', result.status);
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
    fetch(`${baseURL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        console.log('Status: ', result.status);
        if (result.status === 400) {
          return result.json().then(badRequest => {
            console.log(badRequest)
            reject(badRequest);
          })
        }
        if (result.status === 200) {
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


function createNewFlujo(types) {
  return new Promise((resolve, reject) => {
    fetch(`${baseURL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        types,
      })
    })
      .then(result => {
        console.log('Status: ', result.status);
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
    fetch(`${baseURL}`)
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


export const FlujoServices = {
  getFlujoById,
  verifyFlujoToken,
  createNewFlujo,
  GetFlujosPaginated,
}
