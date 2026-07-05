import { Events } from 'discord.js';
import { Event } from '../types';
import { Logger } from '../utils/logger';

const readyEvent: Event<Events.ClientReady> = {
  name: Events.ClientReady,
  once: true,
  execute: (client) => {
    Logger.success(`Ready! Logged in as ${client.user?.tag}`);
  },
};

export default readyEvent;
