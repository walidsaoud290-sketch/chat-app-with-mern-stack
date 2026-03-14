import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URI,
});


redisClient.on("error",(err)=>{
    console.log("Error redis :",err);
})
await redisClient.connect()
console.log("Connection redis successfuly");

// utilisation de redis :
// 1 stocker les sessions :
// redisClient.set("sess:123",5,"EX",3600) expires apres 1h

// 2_ stocker les donnees temporaires (cache)
// redisClient.set("user:10:profile",1231,"EX",300); expries apres 5min

// 3_ Pub/Sub messages en temps reel
/* await redisClient.publish("chat","Nouvelle discussion !")
await redisClient.subscribe("chat",(message)=>console.log(message)) */

// 4_ compteurs :
// await redisClient.incr("page_views");increment chaque visite