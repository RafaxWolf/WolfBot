
# Handlers

## Commands Handlers
### Prefix Commands
```js
  module.exports = {
    name: "name",
    alias: ["desc"],

    execute (client, message, args){

      // ...

    }

  }
```

### Slash Commands

```js
  const { SlashCommandBuilder } = require("discord.js")

  module.exports = {
      data: new SlashCommandBuilder()
      .setName("name")
      .setDescription("desc"),

      async run(client, interaction){
        
        // ...

      }
          
  }
```

## Other Handlers
### Events

```js
  module.exports = {
    name: 'name',
    execute(client) {

      // ...

    }

  }
```

### Schemas

```js
  const { Schema, model} = require("mongoose")

  const name = new Schema({
    guildID: String,
    userID: String
    // ...
  });

  module.exports = model('name', name)
```
