
import * as inquirer from 'inquirer';
import { Provide } from '@jib/cli';

export interface JibPrompt extends inquirer.Inquirer { }

export interface IPromptAdapter {
  prompt(questions: inquirer.Questions): Promise<any>;
  prompt<T>(questions: inquirer.Questions<T>): Promise<T>;
  prompt<T>(questions: inquirer.Questions<T>, cb: (answers: T) => any): any;
  prompt<T>(questions: inquirer.Questions<T>, cb?: (answers: T) => any): Promise<T> | any;
}

@Provide<JibPrompt>({
  factory: () => JibPrompt.init(),
})
export class JibPrompt implements IPromptAdapter {

  /**
   * plugin factory initializer
   */
  public static init(): JibPrompt {
    const instance = new this();
    const { _adapter } = this;
    return new Proxy(instance, {
      get: (target, prop) => target[prop] || inquirer[prop],
    });
  }

  /**
   * Use custom prompt adapter to resolve questions into answers.
   * @param adapter
   *
   * ```typescript
   * JibPrompt.adapter({
   *   prompt: (questions: any, cb?: any) => Promise.resolve({}),
   * });
   * ```
   */
  public static adapter(adapter: IPromptAdapter): void {
    this._adapter = adapter;
  }

  private static _adapter: IPromptAdapter = inquirer;

  public prompt(questions: inquirer.Questions): Promise<any>;
  public prompt<T>(questions: inquirer.Questions<T>): Promise<T>;
  public prompt<T>(questions: inquirer.Questions<T>, cb: (answers: T) => any): inquirer.ui.Prompt;
  public prompt<T>(questions: inquirer.Questions<T>, cb?: (answers: T) => any): Promise<T> | inquirer.ui.Prompt {
    const { _adapter } = this.constructor as typeof JibPrompt;
    return _adapter.prompt(questions, cb);
  }
}
