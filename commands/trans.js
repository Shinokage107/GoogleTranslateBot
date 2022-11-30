const { SlashCommandBuilder } = require("discord.js");
const translate = require("@iamtraction/google-translate");
module.exports = {
  name: "trans",
  description: "Translate",
  type: "user",

  commandBuilder() {
    const data = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((option) =>
        option
          .setName("lang")
          .setDescription("Sets the output language as ISO 639-1")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("input")
          .setDescription("The text u want to translate")
          .setRequired(true)
      );
    return data;
  },

  async execute(interaction) {
    input = interaction.options.getString("input");
    lang = interaction.options.getString("lang");
    reply = "Translating ...";

    await translate(input, { to: lang, raw: true })
      .then((res) => {
        reply = res.text;
      })
      .catch((err) => {
        console.log(err);
        reply = err.message;
      });

    await interaction.reply(reply);
  },
};
