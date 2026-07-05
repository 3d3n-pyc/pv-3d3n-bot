import { Client, Collection, GatewayIntentBits, ClientOptions } from 'discord.js';
import { Command } from './types';

export class BotClient extends Client {
  public commands: Collection<string, Command>;

  constructor(options?: ClientOptions) {
    super({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
      ...options,
    });
    this.commands = new Collection();
  }
}
