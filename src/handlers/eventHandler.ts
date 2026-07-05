import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { BotClient } from '../BotClient';
import { Event } from '../types';
import { Logger } from '../utils/logger';

export const loadEvents = async (client: BotClient) => {
  const eventsPath = path.join(__dirname, '../events');

  if (!fs.existsSync(eventsPath)) {
    fs.mkdirSync(eventsPath, { recursive: true });
    return;
  }

  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event: Event<any> = (await import(pathToFileURL(filePath).href)).default;

    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args));
    }
  }

  Logger.info(`Successfully loaded ${eventFiles.length} events.`);
};
