const { SlashCommandBuilder } = require("discord.js")
const { OpenAIApi, Configuration } = require("openai")
//require("dotenv").config()

const configuration = new Configuration({
    //apikey: process.env.OPENAI_API_KEY,
    apiKey: "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"
})
const openai = new OpenAIApi(configuration)

module.exports = {
    data: new SlashCommandBuilder()
    .setName("createimage")
    .setDescription("Create an image with Dall-E from OpenAI")
    .addStringOption(option =>
        option
        .setName("text")
        .setDescription("asd")
        .setRequired(true)
        )
    .addNumberOption(option =>
        option
        .setName("number")
        .setDescription("Number of images to generate")
        .setMinValue(1)
        .setMaxValue(10)
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName("size")
        .setChoices(
            { name: "256x256", value: "256x256" },
            { name: "512x512", value: "512x512" },
            { name: "1024x1024", value: "1024x1024" },
        )
        .setDescription("Size of the image")
        .setRequired(true)
        ),

    async run(client, interaction){
      const text = interaction.options.getString("text")
      const number = interaction.options.getNumber("number")
      const size = interaction.options.getString("size")

      try {
        const response = await openai.createImage({
            prompt: `${text}`,
            n: number,
            size: `${size}`,
        })
        image_url = response.data.data(0).url

        console.log(image_url)

        interaction.reply({ content: `${image_url}` })
      } catch (error) {
        if (error.response) {
            console.log(error.response.status)
            console.log(error.response.data)
        } else {
            console.log(error.message)
        }

      }

        
    }
        
}