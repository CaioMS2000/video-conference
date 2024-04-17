"use server";
import { randomUUID } from 'node:crypto';
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    if(!apiKey) throw new Error('No API key');
    if(!apiSecret) throw new Error('No API secret');

    const streamClient = new StreamClient(apiKey, apiSecret)
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60
    const issued = Math.floor(Date.now() / 1000) - 60
    const userId = await generateUUID()
    const token = streamClient.createToken(userId, exp, issued)

    return token
}

export const generateUUID = async () => {
    return randomUUID().toString(); /* as i'm not using authentication, i need to somehow provide a unique id */
}