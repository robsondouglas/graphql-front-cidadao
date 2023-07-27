self.addEventListener("push", function (event) {
  
  const notify = (message) => {
    try{
      self.registration.showNotification( message.title, { body: message.text });
      }
      catch(ex)
      {
        console.log('Notificação com formato inválido. Use o seguinte formato: ', '{ "title": "TESTE", "text": "Teste de notificação" }')
        console.log('Dados recebidos:', event)
      }
    }
  
  const data = event.data.json();
  if(Array.isArray(data))
  { data.map(m=>notify(m)) }
  else
  { notify(data) }

})
  