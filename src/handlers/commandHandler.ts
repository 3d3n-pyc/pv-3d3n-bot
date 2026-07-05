import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { REST, Routes } from 'discord.js';
import { BotClient } from '../BotClient';
import { Command } from '../types';
import { Logger } from '../utils/logger';

export const loadCommands = async (client: BotClient) => {
  const commandsPath = path.join(__dirname, '../commands');

  if (!fs.existsSync(commandsPath)) {
    fs.mkdirSync(commandsPath, { recursive: true });
    return;
  }

  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

  const commandsToRegister = [];

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command: Command = (await import(pathToFileURL(filePath).href)).default;

    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      commandsToRegister.push(command.data.toJSON());
    } else {
      Logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }

  if (!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID) {
    Logger.warn('Missing DISCORD_TOKEN or CLIENT_ID. Commands will not be registered to Discord API.');
    return;
  }

  const rest = new REST().setToken(process.env.DISCORD_TOKEN);

  try {
    Logger.info(`Started refreshing ${commandsToRegister.length} application (/) commands.`);
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commandsToRegister });
    Logger.success(`Successfully reloaded application (/) commands.`);
  } catch (error) {
    Logger.error('Failed to register commands:', error);
  }
};
