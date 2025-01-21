export const msalConfig = {
    auth: {
      clientId: '49472000-635e-4fdf-a7c7-874b704d8701', // aqui se accede al ID de la aplicación registrada en Azure
      authority: 'https://login.microsoftonline.com/4bc0e4bd-b054-4eb1-a4d3-ef13dc805095', // Este es el acceso del inquilino de Microsoft ID
      redirectUri: 'http://localhost:3000/', // Aqui va el puerto de donde accese la aplicación a la API de Microsoft Graph
    },
    cache: {
      cacheLocation: 'localStorage', // Se guarda el token de acceso en el almacenamiento local
      storeAuthStateInCookie: false, 
    },
  };
  
  export const loginRequest = {
    scopes: ['user.read', 'mail.read', 'mail.send'], // Aqui se ponen los permisos de la API
  };
  