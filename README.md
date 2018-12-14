# Jib Prompt Plugin

Plugin for `@jib/cli` to support the extensible prompt framework,
[`inquirer`](https://www.npmjs.com/package/inquirer).

[![wercker status](https://app.wercker.com/status/270e97b656d272fee1fb5806b01377fa/s/master "wercker status")](https://app.wercker.com/project/byKey/270e97b656d272fee1fb5806b01377fa)

## About

This project was generated using the [`jib`](https://www.npmjs.com/package/@jib/jib)
command line generator.

## Usage

```shell
npm install --save @jib/prompt
```

Using within `@jib/cli` commands:

```typescript
import { Command, Plugin } from '@jib/cli';
import { JibPrompt } from '@jib/prompt';

@Command({/* */})
class MyCustomCommand {
  // inject plugin
  @Plugin(JibPrompt)
  public helper: JibPrompt;

  public async run(options: any, ...args: string[]) {
    this.helper.prompt({
      // ...
    })
  }
}
```
