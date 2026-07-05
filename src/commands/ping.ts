import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types';
import { t } from '../i18n';

const pingCommand: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),

  execute: async (interaction, client) => {
    const locale = interaction.locale;

    // Defer reply if logic is slow, but ping is fast
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;

    // Use translation system
    const response = t('ping.response', locale, { latency });

    await interaction.editReply({ content: response });
  },
};

export default pingCommand;
