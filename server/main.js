import { Meteor } from 'meteor/meteor';



Meteor.startup(() => {
  WebApp.connectHandlers.use('/time', (req, res, next) => {
    if (req.method === 'GET') {
      const currentTime = new Date().toISOString();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ time: currentTime }));
    } else {
      res.writeHead(405);
      res.end(); // Método não permitido
    }
  });
});