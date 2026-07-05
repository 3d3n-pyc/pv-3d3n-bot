import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { BotClient } from '../BotClient';
import { Button } from '../types';
import { Logger } from '../utils/logger';

export const loadButtons = async (client: BotClient) => {
  const buttonsPath = path.join(__dirname, '../buttons');
  
  if (!fs.existsSync(buttonsPath)) {
    // If the directory doesn't exist, we just skip loading buttons
    return;
  }

  const buttonFiles = fs.readdirSync(buttonsPath).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of buttonFiles) {
    const filePath = path.join(buttonsPath, file);
    const fileUrl = pathToFileURL(filePath).href;

    try {
      const buttonModule = await import(fileUrl);
      const button: Button = buttonModule.default;

      if (button && 'customId' in button && 'execute' in button) {
        client.buttons.set(button.customId, button);
      } else {
        Logger.warn(`The button at ${filePath} is missing a required "customId" or "execute" property.`);
      }
    } catch (error) {
      Logger.error(`Error loading button ${file}:`, error);
    }
  }

  if (buttonFiles.length > 0) {
    Logger.info(`Successfully loaded ${buttonFiles.length} buttons.`);
  }
};
