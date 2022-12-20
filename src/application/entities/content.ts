//value object de conteudo
export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validationContentLenght(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentLengthValid = this.validationContentLenght(content);

    if (!isContentLengthValid) {
      throw new Error('Content lenght error.');
    }
    this.content = content;
  }
}
