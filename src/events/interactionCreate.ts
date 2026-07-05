import { Events } from 'discord.js';
import { Event } from '../types';
import { t } from '../i18n';
import { Logger } from '../utils/logger';

const interactionCreateEvent: Event<Events.InteractionCreate> = {
  name: Events.InteractionCreate,
  execute: async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      Logger.warn(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction, client);
    } catch (error) {
      Logger.error(`Error executing command ${interaction.commandName}:`, error);

      const errorMessage = t('error_command', interaction.locale, {
        defaultValue: 'There was an error while executing this command!',
      });

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: errorMessage, ephemeral: true });
      } else {
        await interaction.reply({ content: errorMessage, ephemeral: true });
      }
    }
  },
};

export default interactionCreateEvent;
