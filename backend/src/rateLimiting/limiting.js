import RateLimit from "express-rate-limit"; // permet de limiter le nombre de requete qu'un user peut faire sur une route
import { RedisStore } from "rate-limit-redis";
import { redisClient } from "../config/redis.js";


export const limiter = RateLimit({
    // RedisStore permet de stocker les compteurs dans redis 
    // ? pourquoi ? Si tu utilises plusieurs instances de ton backend (load balancing), Redis garde le compteur centralisé pour tous les serveurs.
  store: new RedisStore({
    // cette fonction permet à la librairie d'envoyer des commandes redis 
    // args contient [commandeRedis,key,value]
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  // max 5 requetes par minute
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: {
    error: "Too many attempts, try again later",
    
  },
});
