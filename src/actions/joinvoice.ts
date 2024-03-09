// src/lib/actions/joinVoice.ts
import { joinVoiceChannel } from "@discordjs/voice";
import { State, type Action, type BgentRuntime, type Message } from "bgent";
import { Channel, ChannelType, Client, Message as DiscordMessage, Guild, GuildMember } from "discord.js";

export default {
  name: "JOIN_VOICE",
  validate: async (_runtime: BgentRuntime, message: Message) => {
    return true;
  },
  description: "Join a voice channel to participate in voice chat.",
  handler: async (runtime: BgentRuntime, message: Message, state: State): Promise<boolean> => {
    if (!state.discordClient) {
      throw new Error("Discord client is not available in the state.");
    }
    if (!state.discordMessage) {
      throw new Error("Discord message is not available in the state.");
    }

    const id = (state?.discordMessage as DiscordMessage).guild?.id as string;
    const client = state.discordClient as Client;
    const voiceChannels = (client.guilds.cache.get(id) as Guild)
      .channels.cache.filter((channel: Channel) => channel.type === ChannelType.GuildVoice);

    const channelName = (state.discordMessage as DiscordMessage).content.toLowerCase();
    const targetChannel = voiceChannels.find((channel) =>
      (channel as { name: string }).name.toLowerCase().includes(channelName)
    );

    if (targetChannel) {
      joinVoiceChannel({
        channelId: targetChannel.id,
        guildId: (state.discordMessage as DiscordMessage).guild?.id as string,
        adapterCreator: (client.guilds.cache.get(id) as Guild).voiceAdapterCreator,
      });
      return true;
    } else {
      const member = (state.discordMessage as DiscordMessage).member as GuildMember;
      if (member.voice.channel) {
        joinVoiceChannel({
          channelId: member.voice.channel.id,
          guildId: (state.discordMessage as DiscordMessage).guild?.id as string,
          adapterCreator: (client.guilds.cache.get(id) as Guild).voiceAdapterCreator,
        });
        return true;
      } else {
        await (state.discordMessage as DiscordMessage).reply("Please specify a valid voice channel or join one.");
        return false;
      }
    }
  },


  condition: "The agent wants to join a voice channel to participate in voice chat.",
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          content: "Hey, let's jump into the 'General' voice channel and chat!",
          action: "WAIT",
        },
      },
      {
        user: "{{user2}}",
        content: {
          content: "Sure! I'm joining the voice channel now.",
          action: "JOIN_VOICE",
        },
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          content: "{{user2}}, can you join the voice channel? I want to discuss our game strategy.",
          action: "WAIT",
        },
      },
      {
        user: "{{user2}}",
        content: {
          content: "Absolutely! I'll join right now.",
          action: "JOIN_VOICE"
        },
      },
    ],
    [
      {
        user: "{{user1}}",
        content: {
          content: "Hey {{user2}}, we're having a team meeting in the 'Conference' voice channel. Can you join us?",
          action: "WAIT",
        },
      },
      {
        user: "{{user2}}",
        content: {
          content: "Sure thing! I'll be right there.",
          action: "JOIN_VOICE"
        },
      },
    ],
    [
      {
        user: "{{user1}}",
        content: {
          content: "{{user2}}, let's have a quick voice chat in the 'Lounge' channel.",
          action: "WAIT",
        },
      },
      {
        user: "{{user2}}",
        content: {
          content: "Sounds good! Joining the 'Lounge' channel now.",
          action: "JOIN_VOICE",
        },
      },
    ],
    [
      {
        user: "{{user1}}",
        content: {
          content: "Hey {{user2}}, can you join me in the 'Music' voice channel? I want to share a new song with you.",
          action: "WAIT",
        },
      },
      {
        user: "{{user2}}",
        content: {
          content: "Oh, exciting! I'm joining the channel. Can't wait to hear it!",
          action: "JOIN_VOICE"
        },
      },
    ],
  ],
} as Action;