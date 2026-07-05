import 'dotenv/config';
import { BotClient } from './BotClient';
import { loadEvents } from './handlers/eventHandler';
import { loadCommands } from './handlers/commandHandler';
import { loadButtons } from './handlers/buttonHandler';
import { dbInitPromise } from './database'; // Initialize DB connection
import { Logger } from './utils/logger';

const client = new BotClient();

const start = async () => {
  try {
    await dbInitPromise;
    await loadEvents(client);
    await loadCommands(client);
    await loadButtons(client);

    if (!process.env.DISCORD_TOKEN) {
      throw new Error('DISCORD_TOKEN is missing in .env file');
    }

    await client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    Logger.error('Failed to start the bot:', error);
  }
};

start();
