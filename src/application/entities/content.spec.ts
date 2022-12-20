import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Voce recebeu uma solicitação de amizade');

    //espero que content seja correto/ok
    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less then 5 characters', () => {
    //espero que content com menos de 5 caracteres, lance um erro
    expect(() => new Content('voce')).toThrow();
  });

  it('should not be able to crate a notification conten with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
