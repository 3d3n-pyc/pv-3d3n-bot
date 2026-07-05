import { Client, Collection, ClientOptions, GatewayIntentBits } from 'discord.js';
import { Command, Button } from './types';

export class BotClient extends Client {
  public commands: Collection<string, Command>;
  public buttons: Collection<string, Button>;

  constructor(options?: ClientOptions) {
    super({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
      ...options,
    });
    this.commands = new Collection();
    this.buttons = new Collection();
  }
}
