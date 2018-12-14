
import * as inquirer from 'inquirer';
import { Provide } from '@jib/cli';

export interface JibPrompt extends inquirer.Inquirer { }

@Provide<JibPrompt>({
  factory: () => JibPrompt.init(),
})
export class JibPrompt {
  public static init(): JibPrompt {
    const instance = new this();
    return new Proxy(instance, {
      get: (target, prop) => target[prop] || inquirer[prop],
    });
  }
}
