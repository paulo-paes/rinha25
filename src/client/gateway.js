const URL_DEFAULT = ''
const URL_FALLBACK = ''

export const sendToGateway = async (data, def = true) => {
  const url = def ? URL_DEFAULT : URL_FALLBACK
  // await fetch(url, {
  //   body: data,
  //   method: 'POST'
  // })
}

export const healthCheck = async (def = true) => {
  const url = def ? URL_DEFAULT : URL_FALLBACK

  await fetch(`${url}/service-health`, {
    method: 'GET'
  })
}